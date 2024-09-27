USE sayara;

INSERT INTO city_entity(name, `address`, coordinate) VALUES ('Paris', NULL, ST_GeomFromText('POINT(2.3522 48.8566)')),
                                                          ('Marseille', NULL, ST_GeomFromText('POINT(5.3698 43.2965)')),
                                                          ('Lyon', NULL, ST_GeomFromText('POINT(4.835659 45.764042)')),
                                                          ('Toulouse', NULL, ST_GeomFromText('POINT(1.4442 43.6047)')),
                                                          ('Nice', NULL, ST_GeomFromText('POINT(7.2620 43.7102)')),
                                                          ('Nantes', NULL, ST_GeomFromText('POINT(-1.5536 47.2184)')),
                                                          ('Strasbourg', NULL, ST_GeomFromText('POINT(7.7521 48.5734)')),
                                                          ('Montpellier', NULL, ST_GeomFromText('POINT(3.8767 43.6108)')),
                                                          ('Bordeaux', NULL, ST_GeomFromText('POINT(0.5792 44.8378)')),
                                                          ('Lille', NULL, ST_GeomFromText('POINT(3.0573 50.6292)'));
