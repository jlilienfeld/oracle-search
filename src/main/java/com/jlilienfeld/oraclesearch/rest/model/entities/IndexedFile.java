package com.jlilienfeld.oraclesearch.rest.model.entities;

import com.jlilienfeld.oraclesearch.rest.model.FileData;
import com.jlilienfeld.oraclesearch.rest.model.Meta;
import com.jlilienfeld.oraclesearch.rest.model.Path;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.Map;

@Document(indexName = "docs")
@Getter
@Setter
public class IndexedFile {
    @Id
    private String id;

    @Field
    private String content;

    @Field
    private String attachment;

    @Field
    private Meta meta;

    @Field
    private FileData file;

    @Field
    private Path path;

    @Field
    private Map<String, Object> object;

    @Field
    private Map<String, Object> external;

}
