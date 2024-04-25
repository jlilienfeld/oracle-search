package com.jlilienfeld.oraclesearch.es.repository;

import com.jlilienfeld.oraclesearch.rest.model.entities.IndexedFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends ElasticsearchRepository<IndexedFile, String> {
    Page<IndexedFile> findByContent(String content, Pageable pageable);
}
