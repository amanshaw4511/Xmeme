package com.crio.xmeme.service;

import java.util.List;

import com.crio.xmeme.model.Meme;

public interface MemeService {

    /**
     * Fetch all the memes from database then sort them descending according to id
     * then returns first 100 memes.
     * 
     * @return list of 100 recents memes
     */
    public List<Meme> get100Meme();

    /**
     * Fetch Meme by id
     * 
     * @param id id of the meme to be returned
     * @return Meme object if exist else return null
     */
    public Meme getMeme(int id);

    /**
     * Add a new meme to database
     * 
     * @param meme meme object containing name, url and caption
     * @return generated id of the new Meme
     */
    public int addMeme(Meme meme);

    /**
     * Delete a meme form database. It find the meme with the given id as parameter
     * is exist or not. if it exist then it delet it and return true else false.
     * 
     * @param id id of the meme to be deleted
     * @return true if meme exist with id and deleted else false
     */
    public boolean deleteMeme(int id);

    /**
     * Update Meme url or Caption or both.
     * 
     * @param id   Id of the meme to be updated
     * @param meme Meme object containing new url and caption to be update
     * @return meme object of updated meme and returns null if meme with id
     *         paramtern not exists
     */
    public Meme updateMeme(int id, Meme meme);

    /**
     * Check if any meme with given name, url and caption already exist in database.
     */
    public boolean alreadyExist(Meme meme);

}
