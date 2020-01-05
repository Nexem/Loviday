-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `pwd` varchar(30) NOT NULL,
  PRIMARY KEY (`email`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomList` varchar(30) NOT NULL,
  `code` varchar(30) NOT NULL,
  `Email` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CODE_PRODUCT_CODE` (`code`),
  KEY `FK_EMAIL_USERS_EMAIL` (`Email`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `Code` varchar(30) NOT NULL,
  PRIMARY KEY (`Code`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
CREATE TABLE IF NOT EXISTS `favorite` (
  `Code` varchar(30) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  KEY `FK_PRODUCT_CODE` (`Code`),
  KEY `FK_USER_EMAIL` (`Email`)
) ;
COMMIT;