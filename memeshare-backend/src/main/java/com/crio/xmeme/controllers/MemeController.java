package com.crio.xmeme.controllers;

import java.util.List;
import java.util.Map;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Min;

import com.crio.xmeme.model.Meme;
import com.crio.xmeme.service.MemeServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Validated
@Api(description = "MicroService For Meme Post Management", tags = { "memes" })
@RestController
@CrossOrigin("*") // allow cross orgin request by browser
@RequestMapping("/memes")
public class MemeController {

    @Autowired
    MemeServiceImpl memeService;

    /**
     * Add a new Meme
     * 
     * @param meme Meme object contains name, url, caption
     * @return created Meme id
     */
    @ApiOperation(value="Add a Meme post", notes="returns the id")
    @PostMapping
    public ResponseEntity<Object> AddMeme(@Valid @RequestBody Meme meme) {
        // if the meme with same name,url and caption already exists return 409
        if (memeService.alreadyExist(meme)) {
            return ResponseEntity.status(409).body("content already exists");
        }

        int id = memeService.addMeme(meme);
        System.out.println(meme);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", id));
    }

    /**
     * Get recent 100 Memes
     * 
     * @return list of 100 memes
     */
    @ApiOperation(value = "Get list of recent 100 Memes", response = Meme.class)
    @GetMapping
    public List<Meme> get100Meme() {
        return memeService.get100Meme();
    }

    /**
     * Find Meme with given id
     * 
     * @param id Meme id to return
     * @return maching Meme
     */
    @ApiOperation(value = "Find Meme post by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getMeme(@PathVariable @Min(1) int id) {
        Meme meme = memeService.getMeme(id);
        if (meme == null) {
            return ResponseEntity.status(404).body("id not found");
        } else {
            return ResponseEntity.ok(meme);
        }
    }

    /**
     * Delete a Meme by id
     * 
     * @param id Meme id to delete
     * @return 204 if found and deleted else 404
     */
    @ApiOperation(value = "Delete a Meme post")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMeme(@PathVariable @Min(1) int id) {
        if (!memeService.deleteMeme(id)) {
            return ResponseEntity.status(404).body("id not found");
        }
        return ResponseEntity.status(204).body("meme deletion successful");
    }

    /**
     * Update a Meme by id
     * 
     * @param id Meme id to be updated
     * @param meme Meme object containing url and caption
     * @return Modified Meme if found else 404
     */
    @ApiOperation(value="Update a Meme post")
    @PatchMapping("/{id}")
    public ResponseEntity<Object> updateMeme(@PathVariable @Min(1) int id, @RequestBody Meme meme) {
        System.out.println(meme);
        if (meme.getName() != null) {
            ResponseEntity.status(400).body("name can not changed");
        }

        Meme createdMeme = memeService.updateMeme(id, meme);
        if (createdMeme == null) {
            return ResponseEntity.status(404).body("id not found");
        } else {
            return ResponseEntity.ok("meme update successful");
        }
    }

    // returns 400 instead of 500 on ConstrainViolationException
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(Map.of("errors", List.of(e.getMessage())), HttpStatus.BAD_REQUEST);
    }
}
