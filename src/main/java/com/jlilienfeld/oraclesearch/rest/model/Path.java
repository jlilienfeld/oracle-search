package com.jlilienfeld.oraclesearch.rest.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Path {
    private String root;
    private String virtual;
    private String real;
}
