-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
\c music

CREATE TABLE artists
(
  artist_id SERIAL PRIMARY KEY,
  artist_name TEXT NOT NULL
);

CREATE TABLE albums
(
  album_id SERIAL PRIMARY KEY,
  album_name TEXT NOT NULL
);

CREATE TABLE producers
(
  producer_id SERIAL PRIMARY KEY,
  producer_name TEXT NOT NULL
);

CREATE TABLE songs
(
  song_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album_id INTEGER REFERENCES albums(album_id),
  artist_id INTEGER REFERENCES artists(artist_id)
);

CREATE TABLE SongsProducers
(
  song_id INTEGER REFERENCES songs(song_id),
  producer_id INTEGER REFERENCES producers(producer_id),
  PRIMARY KEY (song_id, producer_id)
);

INSERT INTO artists (artist_name)
VALUES 
  ('Hanson'),
  ('Queen'),
  ('Mariah Carey'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny''s Child');

INSERT INTO albums (album_name)
VALUES 
  ('Middle of Nowhere'),
  ('A Night at the Opera'),
  ('Daydream'),
  ('A Star Is Born'),
  ('Silver Side Up'),
  ('The Blueprint 3'),
  ('Prism'),
  ('Hands All Over'),
  ('Let Go'),
  ('The Writing''s on the Wall');

INSERT INTO producers (producer_name)
VALUES 
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'),
  ('Cirkut'),
  ('Shellback'),
  ('Benny Blanco'),
  ('The Matrix'),
  ('Darkchild');

-- Unsure about best way to add multiple artists to a song.
INSERT INTO songs (title, duration_in_seconds, release_date, album_id, artist_id)
VALUES
  ('MMMBop', 238, '1997-04-15', 1, 1),
  ('Bohemian Rhapsody', 355, '1975-10-31', 2, 2),
  ('One Sweet Day', 282, '1995-11-14', 3, 3),
  ('Shallow', 216, '2018-09-27', 4, 5),
  ('How You Remind Me', 223, '2001-08-21', 5, 7),
  ('New York State of Mind', 276, '2009-10-20', 6, 8),
  ('Dark Horse', 215, '2013-12-17', 7, 10),
  ('Moves Like Jagger', 201, '2011-06-21', 8, 12),
  ('Complicated', 244, '2002-05-14', 9, 14),
  ('Say My Name', 240, '1999-11-07', 10, 15);
