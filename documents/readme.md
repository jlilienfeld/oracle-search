# Overview
This directory contains various documentation of the project.

# Hardware components
The system is built as a Home Lab which has the following hardware:
* HP Proliant DL360p G8 8 Bays 2.5 Server - 2X Intel Xeon E5-2630 2.3GHz 6 Core - 64GB DDR3 REG Memory
  * 2 10GBE nics
    * One to the fibe modem (3GBPS Up and Down)
    * One to the network's aggregation switch
  * Dedicated 100% to run pfSense
* HP Proliant DL360p G8 8 Bays 2.5 Server - 2X Intel Xeon E5-2680 2.7GHz 8 Core - 192GB DDR3 REG Memory - HP P420i 512MB Raid Controller - 12.8TB (8X 1.6TB SAS SSD)
  * 1 SSD is OS disk
  * 7 SSDs are used by Ceph to build a 11.2TB SSD storage Pool.
    * Used for Elastic Search indexing for now.
  * Runs as a Kubernetes worker node
* Server with 2x Xeon (X5670  @ 2.93GHz) and 48GB ram
  * I got 5 servers with this configuration.  Only one is running, for electricity savings (And for noise reduction!!).  So 4 are left stopped most of the time.
  * 2 16TB HDDs are used by Ceph to build a 36TB HDD storage pool.
    * Used to store the documents themselves.
* Server with 1x Xeon (X5670  @ 2.93GHz) and 24GB ram

The network is all built on Ubiquiti, except the router which is pfSense:
* Aggregation switch (USW Pro Agg)
  * All 10GPS capable hosts connects here
  * All servers of this system connects here
* Main Switch (USW Ent 48 PoE)
* Lab Switch (USW Ent 8 PoE)

## Improvements wishes
* Replace the pfSense box by an actual pfSense appliance.
* Replace all DL360p by something more energy efficient that would be capable of running all the SSDs and HHDs.
* Build an NVMe based Ceph storage pool.
* Build an ARM cluster, for electricity efficiency and noise reduction.

# Software components
This diagram shows how this software is deployed:
![test](https://raw.githubusercontent.com/jlilienfeld/oracle-search/main/documents/Software%20Components%20Diagram.drawio.png)
The software runs inside a Kubernetes cluster.  It receives traffic from a local pfSense router which forwards all traffic to port 443 to a Virtual IP address that the Cluster's Traefik Ingress listens on (MetalLB is used to assign this virtual IP to traefik).  From there, the cluster will forward the HTTPS traffic to the Oracle search application, which may further proxy the request to downstream services, after authenticating such request.

The network flow is:
User -> CloudFlare -> pfSense -> Traefik's metallb IP -> Traefik's reverse proxy -> Oracle Search -> downstream service
pfSense only allows traffic from [CloudFlare's CIDRs](https://www.cloudflare.com/ips/)
This setup allows hiding the system's public IPs to the public.  It is not possible to access the system via other means than CloudFlare.

"Oracle Search" application is reponsible for:
* Authenticating users and their requests.
  * Currently this is done via Auth0.
* Serves the Fronend UI Single Page Application as static content.
* Forwards authenticated search requests to Elastic Search.
* (TODO) Forwards authenticated zipped data dumps to "Archive Ingester".
  * Currently not implemented.  I can only upload from inside my network until I implement this.
* (TODO) Forwards authenticated file download requests to "Archive Ingester".
  * Currently not implemented.

"Archive Ingester" is responsible for:
* Accepts HTTP file upload from user of big zip archives.
  * Unzips the archive while the upload is ongoing, storing uncompressed results to disk.
  * If archive contains nested .zip, they're also unzipped (recursively), storing their content to disk.
  * (TODO) If .eml file is encountered, they'll be processed in this way:
    * create sub-dir called <filename.eml>/ which will contain:
      * Email's text content as .html.  This .html shall contain HREFs links to attachments.
      * Email's attachments as individual files.
* Keep low memory footprint.  Currently, it'll only need well below 100MiB of RAM, and yet handle Terabytes of ZIP files.
* (TODO) Keep a list of un-indexed files.  Iterate that list, and send these files to FSCrawlers instances for indexing.
* (TODO) Provides a mean to query the indexing progress of a previously upload ZIP files.  For example: How many files indexed / Total number files contained in ZIP.

"[FSCrawler](https://fscrawler.readthedocs.io/)" is responsible for:
* Exposing a REST server which accepts files to index.
* (TODO) Will be deployed as multiple instances over multiple hosts to speedup OCR during indexing process of images and PDFs.
