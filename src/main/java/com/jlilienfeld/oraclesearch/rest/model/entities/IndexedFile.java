package com.jlilienfeld.oraclesearch.rest.model.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Document(indexName = "docs")
@Getter
@Setter
public class IndexedFile {
    @Id
    private String id;

    @Field
    private String content;

}
