package com.jlilienfeld.oraclesearch.rest.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Meta {
    private String author;
    private String title;
    private String date;
    private List<String> keywords;
    private String language;
    private String format;
    private String identifier;
    private String contributor;
    private String coverage;
    private String modifier;
    private String creatorTool;
    private String publisher;
    private String relation;
    private String rights;
    private String source;
    private String type;
    private String description;
    private String created;
    private String printDate;
    private String metadataDate;
    private String latitude;
    private String longitude;
    private String altitude;
    private Integer rating;
    private String comments;
}
