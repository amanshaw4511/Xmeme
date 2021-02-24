package com.crio.xmeme.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.crio.xmeme.model.Meme;
import com.crio.xmeme.repository.MemeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemeServiceImpl implements MemeService {

    @Autowired
    private MemeRepository memeRepository;

    @Override
    public List<Meme> get100Meme() {
        List<Meme> memes = new ArrayList<>();
        memeRepository.findAll().forEach(memes::add);
        // sort list in reverse order to display in reverse chronological order (LIFO)
        memes = memes.stream().sorted((a, b) -> b.getId() - a.getId()).limit(100).collect(Collectors.toList());
        return memes;
    }
    
    @Override
    public Meme getMeme(int id) {
        Optional<Meme> optionalMeme = memeRepository.findById(id);
        return optionalMeme.isPresent() ? optionalMeme.get() : null;
    }

    @Override
    public int addMeme(Meme meme) {
        memeRepository.save(meme);
        return meme.getId();
    }

    @Override
    public boolean deleteMeme(int id) {
        Meme meme = this.getMeme(id);
        if (meme == null) {
            return false;
        }
        memeRepository.delete(meme);
        return true;
    }

    @Override
    public Meme updateMeme(int id, Meme meme) {
        Meme oldMeme = this.getMeme(id);
        // if meme with the id exist than update the url or caption
        if (oldMeme != null) {
            if (meme.getUrl() != null && !meme.getUrl().isEmpty())
                oldMeme.setUrl(meme.getUrl());
            if (meme.getCaption() != null && !meme.getCaption().isEmpty())
                oldMeme.setCaption(meme.getCaption());
            memeRepository.save(oldMeme);
        }
        return oldMeme;
    }

    @Override
    public boolean alreadyExist(Meme meme) {
        List<Meme> m = memeRepository.findByContent(meme.getName(), meme.getUrl(), meme.getCaption());
        return !m.isEmpty();
    }
}
