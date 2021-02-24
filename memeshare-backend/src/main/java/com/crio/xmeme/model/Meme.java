package com.crio.xmeme.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.URL;




@Entity
@NamedQuery(name = "Meme.findByContent", query = "FROM Meme WHERE name=?1 AND url=?2 AND caption=?3")
public class Meme {

    @Id
    @Min(0)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull(message = "name must not be null")
    @Size(min = 3, max = 20, message = "name character lenght should be between 3 to 20")
    private String name;

    @Size(max = 255, message = "caption character length must less than 255")
    private String caption;

    @NotNull(message = "url must not be null")
    @URL(message = "invalid url")
    private String url;

    public Meme() {
    }


    public Meme(String name, String url, String caption) {
        this.name = name;
        this.caption = caption;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Meme [caption=" + caption + ", id=" + id + ", name=" + name + ", url=" + url + "]";
    }

}
