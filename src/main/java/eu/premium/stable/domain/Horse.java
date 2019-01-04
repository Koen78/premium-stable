package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Horse entity.
 * @author Koen.
 */
@ApiModel(description = "Horse entity. @author Koen.")
@Entity
@Table(name = "horse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "horse")
public class Horse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "descent_father")
    private String descentFather;

    @Column(name = "descent_mother")
    private String descentMother;

    @Column(name = "height")
    private String height;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToOne
    @JsonIgnoreProperties("horses")
    private Stable stable;

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Picture> pictures = new HashSet<>();
    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Video> videos = new HashSet<>();
    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Competition> competitions = new HashSet<>();
    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MedCheck> medChecks = new HashSet<>();
    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LevelJumpingHis> levelJumpingHisses = new HashSet<>();
    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LevelDressageHis> levelDressageHisses = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private LevelDressage levelDressage;

    @ManyToOne
    @JsonIgnoreProperties("")
    private LevelJumping levelJumping;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Gender gender;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Color color;

    @ManyToMany(mappedBy = "horses")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Person> owners = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Horse name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public Horse birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getDescentFather() {
        return descentFather;
    }

    public Horse descentFather(String descentFather) {
        this.descentFather = descentFather;
        return this;
    }

    public void setDescentFather(String descentFather) {
        this.descentFather = descentFather;
    }

    public String getDescentMother() {
        return descentMother;
    }

    public Horse descentMother(String descentMother) {
        this.descentMother = descentMother;
        return this;
    }

    public void setDescentMother(String descentMother) {
        this.descentMother = descentMother;
    }

    public String getHeight() {
        return height;
    }

    public Horse height(String height) {
        this.height = height;
        return this;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getComment() {
        return comment;
    }

    public Horse comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Stable getStable() {
        return stable;
    }

    public Horse stable(Stable stable) {
        this.stable = stable;
        return this;
    }

    public void setStable(Stable stable) {
        this.stable = stable;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public Horse pictures(Set<Picture> pictures) {
        this.pictures = pictures;
        return this;
    }

    public Horse addPictures(Picture picture) {
        this.pictures.add(picture);
        picture.setHorse(this);
        return this;
    }

    public Horse removePictures(Picture picture) {
        this.pictures.remove(picture);
        picture.setHorse(null);
        return this;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }

    public Set<Video> getVideos() {
        return videos;
    }

    public Horse videos(Set<Video> videos) {
        this.videos = videos;
        return this;
    }

    public Horse addVideos(Video video) {
        this.videos.add(video);
        video.setHorse(this);
        return this;
    }

    public Horse removeVideos(Video video) {
        this.videos.remove(video);
        video.setHorse(null);
        return this;
    }

    public void setVideos(Set<Video> videos) {
        this.videos = videos;
    }

    public Set<Competition> getCompetitions() {
        return competitions;
    }

    public Horse competitions(Set<Competition> competitions) {
        this.competitions = competitions;
        return this;
    }

    public Horse addCompetitions(Competition competition) {
        this.competitions.add(competition);
        competition.setHorse(this);
        return this;
    }

    public Horse removeCompetitions(Competition competition) {
        this.competitions.remove(competition);
        competition.setHorse(null);
        return this;
    }

    public void setCompetitions(Set<Competition> competitions) {
        this.competitions = competitions;
    }

    public Set<MedCheck> getMedChecks() {
        return medChecks;
    }

    public Horse medChecks(Set<MedCheck> medChecks) {
        this.medChecks = medChecks;
        return this;
    }

    public Horse addMedChecks(MedCheck medCheck) {
        this.medChecks.add(medCheck);
        medCheck.setHorse(this);
        return this;
    }

    public Horse removeMedChecks(MedCheck medCheck) {
        this.medChecks.remove(medCheck);
        medCheck.setHorse(null);
        return this;
    }

    public void setMedChecks(Set<MedCheck> medChecks) {
        this.medChecks = medChecks;
    }

    public Set<LevelJumpingHis> getLevelJumpingHisses() {
        return levelJumpingHisses;
    }

    public Horse levelJumpingHisses(Set<LevelJumpingHis> levelJumpingHis) {
        this.levelJumpingHisses = levelJumpingHis;
        return this;
    }

    public Horse addLevelJumpingHiss(LevelJumpingHis levelJumpingHis) {
        this.levelJumpingHisses.add(levelJumpingHis);
        levelJumpingHis.setHorse(this);
        return this;
    }

    public Horse removeLevelJumpingHiss(LevelJumpingHis levelJumpingHis) {
        this.levelJumpingHisses.remove(levelJumpingHis);
        levelJumpingHis.setHorse(null);
        return this;
    }

    public void setLevelJumpingHisses(Set<LevelJumpingHis> levelJumpingHis) {
        this.levelJumpingHisses = levelJumpingHis;
    }

    public Set<LevelDressageHis> getLevelDressageHisses() {
        return levelDressageHisses;
    }

    public Horse levelDressageHisses(Set<LevelDressageHis> levelDressageHis) {
        this.levelDressageHisses = levelDressageHis;
        return this;
    }

    public Horse addLevelDressageHiss(LevelDressageHis levelDressageHis) {
        this.levelDressageHisses.add(levelDressageHis);
        levelDressageHis.setHorse(this);
        return this;
    }

    public Horse removeLevelDressageHiss(LevelDressageHis levelDressageHis) {
        this.levelDressageHisses.remove(levelDressageHis);
        levelDressageHis.setHorse(null);
        return this;
    }

    public void setLevelDressageHisses(Set<LevelDressageHis> levelDressageHis) {
        this.levelDressageHisses = levelDressageHis;
    }

    public LevelDressage getLevelDressage() {
        return levelDressage;
    }

    public Horse levelDressage(LevelDressage levelDressage) {
        this.levelDressage = levelDressage;
        return this;
    }

    public void setLevelDressage(LevelDressage levelDressage) {
        this.levelDressage = levelDressage;
    }

    public LevelJumping getLevelJumping() {
        return levelJumping;
    }

    public Horse levelJumping(LevelJumping levelJumping) {
        this.levelJumping = levelJumping;
        return this;
    }

    public void setLevelJumping(LevelJumping levelJumping) {
        this.levelJumping = levelJumping;
    }

    public Gender getGender() {
        return gender;
    }

    public Horse gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Color getColor() {
        return color;
    }

    public Horse color(Color color) {
        this.color = color;
        return this;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Set<Person> getOwners() {
        return owners;
    }

    public Horse owners(Set<Person> people) {
        this.owners = people;
        return this;
    }

    public Horse addOwners(Person person) {
        this.owners.add(person);
        person.getHorses().add(this);
        return this;
    }

    public Horse removeOwners(Person person) {
        this.owners.remove(person);
        person.getHorses().remove(this);
        return this;
    }

    public void setOwners(Set<Person> people) {
        this.owners = people;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Horse horse = (Horse) o;
        if (horse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), horse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Horse{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", descentFather='" + getDescentFather() + "'" +
            ", descentMother='" + getDescentMother() + "'" +
            ", height='" + getHeight() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
