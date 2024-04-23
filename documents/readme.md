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

Authentication is all done with Auth0 and OpenID/Connect.  Spring Boot security is used in the backend to integrate with Auth0.

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

# TODO

* (Priority 1) Improve the frontend with features that OSS provides.  Replicate's Ray's system UI capabilities.  Here's a list of features:
  * The UI shall display a list of documents that failed indexing by fs-crawler.
    * It shall show the error code/description of each failure and the date of the failure.
  * The UI shall display the number of import jobs currently handled by the system.
    * Each import job shall have a progress bar beside it so users can get an idea of how long it'll take to complete, and how much of it is currently indexed.
    * Imports have a priority assigned, which can be changed by admins.  This would allow giving priority to an import over another.
  * This UI shall allow the user to download the documents in the search results.
    * The user will also be able to navigate to other related documents.  Example: A PDF file appears in the search results.  This PDF is an EMail attachement.  Then the user shall be able to see this PDF is an attachement of an email, and see a link to that email.
  * The UI shall allow the user to search for text.
    * Each result is concise, and have a list of tags of interest: Persons, phone numbers, etc
* (Priority 2) Decouple FSCrawler from archive ingester, like depicted in above diagram.  Right now, fs-scrawler is running in FS scrapping mode in the ingester container.  This is not ideal, because it can't be scaled this way, and it is not easy to capture errors.
  * Run multiple fs crawler instances as separate pods.  Each pod will "advertise" themselves to the archive ingester, periodically.
  * "archive ingester" will keep track of fs-crawler instances that it got advertisement from.  It will remove them after not receive advertisement for a period of time, and also, when a request to it failed.
  * "Archive ingester" will load balance indexing requests to those instances.  It will never have more than one concurrent request per fscrawler instance.
* (Priority 3) "Archive Ingester" will keep track of files that got indexed succesfully, and have an endpoint to retrieve the current ingested zip that is currently undergoing indexing, and their progress.
* (Priority 4) "Archive Ingester" will have priority assigned to ZIP imports.

Future work

* RBAC (Role Based access control)
* User management: Ability to add/remove users and assign them to role(s).
  * Right now, can only do this in Auth0 admin interface.

