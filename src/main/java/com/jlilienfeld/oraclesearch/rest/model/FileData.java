package com.jlilienfeld.oraclesearch.rest.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileData {
    private String extension;
    private String contentType;
    private String created;
    private String lastModified;
    private String lastAccessed;
    private String indexingDate;
    private Long filesize;
    private String filename;
    private String url;
    private Integer indexedChars;
    private String checksum;
}
