INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password)
VALUES
  ('Radha', 'Radha@me.com', 'dSFLKJ#$%()'),
  ('Samria', 'Samria@samria.com', 'W#(DFLK)'),
  ('Thomas', 'thomas@apple.com', 'DSFLKJ$%^*(LDSKJFlkj)')
;

INSERT INTO
  reviews (content, user_id, album_id)
VALUES
  ('Quite an awesome album I must say.', 1, 1),
  ('Hated it.', 2, 1),
  ('What can I say? Im in love.', 3, 1),
  ('Thought it to be thoughtful', 1, 2)
;
