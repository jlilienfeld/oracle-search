package com.jlilienfeld.oraclesearch.es;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ssl.NoSuchSslBundleException;
import org.springframework.boot.ssl.SslBundles;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ReactiveElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.elasticsearch.support.HttpHeaders;
import org.springframework.lang.NonNull;

import javax.naming.InvalidNameException;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.ldap.LdapName;
import javax.naming.ldap.Rdn;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLPeerUnverifiedException;
import javax.net.ssl.SSLSession;
import javax.security.auth.x500.X500Principal;
import java.net.InetSocketAddress;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.List;
import java.util.NoSuchElementException;



@Configuration()
@EnableElasticsearchRepositories(basePackages = "com.jlilienfeld.oraclesearch.es.repository")
public class ElasticSearchConfig extends ReactiveElasticsearchConfiguration {

    private final Log log = LogFactory.getLog(getClass());

    static private final String ES_SSL_BUNDLE_NAME = "es-client";

    @Value("${es.host}")
    String esHost;

    @Value("${es.port}")
    Integer esPort;

    @Value("${es.sslEnforceCN:}")
    String sslEnforceCN;

    @Value("${es.apiToken:}")
    String apiToken;

    @Value("${es.username:}")
    String username;

    @Value("${es.password:}")
    String password;

    SSLContext sslContext;
    boolean usingSsl;


    @Autowired
    ElasticSearchConfig(SslBundles sslBundles) {
        try {
            this.sslContext = sslBundles.getBundle(ES_SSL_BUNDLE_NAME).createSslContext();
            this.usingSsl = true;
        } catch (NoSuchSslBundleException e) {
            this.sslContext = null;
            this.usingSsl = false;
        }
    }

    @Override
    @NonNull
    public ClientConfiguration clientConfiguration() {
        if (usingSsl) {
            return ClientConfiguration.builder()
                    .connectedTo(new InetSocketAddress(esHost, esPort))
                    .usingSsl(this.sslContext, new SpecificHostnameVerifier())
                    .withBasicAuth(this.username, this.password)
                    .build();
        } else {
            return ClientConfiguration.builder()
                    .connectedTo(new InetSocketAddress(esHost, esPort))
                    .withHeaders(() -> {
                        HttpHeaders headers = new HttpHeaders();
                        if (!this.apiToken.isEmpty()) {
                            headers.add("Authorization", "Bearer " + this.apiToken);
                        }
                        return headers;
                    })
                    .withBasicAuth(this.username, this.password)
                    .build();
        }
    }

    private class SpecificHostnameVerifier implements HostnameVerifier {

        @Override
        public boolean verify(String hostname, SSLSession session) {
            if (sslEnforceCN.isEmpty()) {
                DefaultHostnameVerifier defaultHostnameVerifier = new DefaultHostnameVerifier();
                return defaultHostnameVerifier.verify(hostname, session);
            } else {
                final Certificate[] certs;
                try {
                    certs = session.getPeerCertificates();
                } catch (SSLPeerUnverifiedException e) {
                    log.warn(e.getMessage(), e);
                    return false;
                }
                final X509Certificate x509 = (X509Certificate) certs[0];
                try {
                    verify(x509);
                    return true;
                } catch (final SSLException | InvalidNameException e) {
                    log.warn(e.getMessage(), e);
                    return false;
                }
            }
        }

        private void verify(final X509Certificate cert) throws SSLException, InvalidNameException {
            final LdapName subjectDN = new LdapName(cert.getSubjectX500Principal().getName(X500Principal.RFC2253));
            final List<Rdn> rdns = subjectDN.getRdns();
            for (int i = rdns.size() - 1; i >= 0; i--) {
                final Rdn rds = rdns.get(i);
                final Attributes attributes = rds.toAttributes();
                final Attribute cn = attributes.get("cn");
                if (cn != null) {
                    try {
                        final Object value = cn.get();
                        if (value != null) {
                            if (sslEnforceCN.equals(value.toString())) {
                                return;
                            }
                        }
                    } catch (final NoSuchElementException | NamingException ignore) {
                        // ignore exception
                    }
                }
            }

            throw new SSLException("Certificate subject doesn't contain " +
                    "a common name and does not have alternative names");
        }
    }

}