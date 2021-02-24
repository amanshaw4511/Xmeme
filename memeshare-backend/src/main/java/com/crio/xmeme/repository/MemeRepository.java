package com.crio.xmeme.repository;

import java.util.List;

import com.crio.xmeme.model.Meme;
import org.springframework.data.repository.CrudRepository;

public interface MemeRepository extends CrudRepository<Meme,Integer>{

    public List<Meme> findByContent(String name, String url, String caption);
    
}
