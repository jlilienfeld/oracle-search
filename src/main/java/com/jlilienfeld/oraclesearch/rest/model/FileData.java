package com.jlilienfeld.oraclesearch.rest.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileData {
    private String filename;
    private Long filesize;
    private String url;
}
