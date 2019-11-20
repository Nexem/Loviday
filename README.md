# Loviday
Asynchronous Programming project repo

Link to the specification on google drive : 
https://docs.google.com/document/d/1JTXnYhJt1o7ouNftORzqDJryLtW5tXUKg0cixRo0xXI/edit?usp=sharing
<br/><br/><br/>


<h2><strong>Sujet</strong></h2>

Loviday est un site web permettant à ses utilisateurs de faire des recherches sur des aliments afin d’en savoir davantage sur leur composition. A cette fonctionnalité s’ajouteront d’autres possibilités telles que l’ajout d’aliments à une liste de favoris. Nous les expliquerons plus tard dans ce document.
<br/><br/>

<strong>Problème:</strong> Aujourd’hui, nombreux sont ceux qui essaient de manger plus sainement et qui veulent davantage de transparence sur les aliments qu’ils ingèrent. Toutefois, il est très long de lire la composition de chaque paquet de gâteau avant de trouver celui qui sera parfait à consommer. Aussi, même en lisant la composition, pour être capable de savoir quels composants sont nocifs ou bénéfiques, cela demande des connaissances que la plupart des gens n’ont pas.
<br/><br/>

<strong>Cible:</strong> Les consommateurs souhaitant un moyen de comparaison efficace et rapide entre les produits proposés par les différentes marques sur le marché. 
<br/><br/>

<strong>Solution:</strong> Notre projet a pour but de faciliter l’accès aux informations demandées par de plus en plus de personnes. Diverses applications mobiles, telles que Yuka, permettent actuellement de scanner les produits que l’on peut trouver dans les rayons de supermarchés. Toutefois, elles ne permettent pas de faire des recherches manuelles. Ainsi, si l’on veut trouver le meilleur paquet de gâteau pour sa santé, nous nous retrouvons obligés de scanner un à un les paquets se trouvant dans le rayon. Notre solution permet donc de faire des recherches en amont. Cela permet aux consommateurs de gagner du temps lorsqu’ils font leurs courses.<br/>
Notre site permettrait également aux consommateurs de prendre conscience des alternatives existantes à leurs moyens de consommations habituels.
<br/><br/><br/>


<h2><strong>Concept</strong></h2>

Notre solution reposera sur l’utilisation de l’API OpenFoodFact. Elle proposera plusieurs fonctionnalités.
<br/><br/>

* Recherche de produits à partir d’un mot clé (ex: Jus d’orange, pâte à tartiner). Possibilité d’ajouter des filtres pour obtenir un résultat plus pertinent. Le résultat de la recherche retourne, dans l’ordre, les produits les plus sains sur des critères de nutrition, transformation, additifs, présence d'allergène. Les produits les plus sains seraient alors mis en avant pour le consommateur souhaitant adapter ses achats.

* Authentification de l’utilisateur avec stockage des deux listes expliquées ci-dessous. Cela lui permettra de pouvoir se connecter à partir de plusieurs plateformes et de simplement retrouver ses données.

* Création d’une liste de produits permettant à l’utilisateur de la consulter facilement lorsqu’il fait ses courses. Ainsi, il peut visualiser rapidement quels sont les produits dont il a besoin et les repérer dans le rayon grâce à la photo mise à sa disposition sur l’application.<br/>
L’utilisateur peut créer, modifier et supprimer autant de listes de produits qu’il souhaite.

* Ajout de produits à une liste de “Favoris” (indépendante de la liste de produits expliquée précédemment). A partir d’une recherche, l’utilisateur peut sélectionner et ajouter à ses favoris les produits qu’il souhaite garder de côté. Par exemple, il pourra facilement compléter sa liste de produit à partir de ses favoris.
<br/><br/>

<strong>Contraintes:</strong> Étant donné que les données mises à disposition sur OpenFoodFacts ne sont pas toujours suffisamment renseignées, seuls les produits contenants les informations nutritives seront affichés à l’utilisateur.
<br/><br/>

<strong>Objectifs:</strong> Exploiter l’API écrite pour le projet de M1 de notre groupe afin de retourner les produits souhaités. Il faudra par la suite appliquer un filtre sur la recherche afin d’affiner les critères voulus.<br/>

Une programmation asynchrone sera également nécessaire afin d’actualiser en temps réel la liste des produits sur la page et ainsi éviter les temps de chargement (potentiellement beaucoup de données à traiter).
<br/><br/>


<strong>Visuel/Ergonomie:</strong> Créer un site web ergonomique et simple d’utilisation. Il est important de minimiser les étapes entre l’arrivée sur le site et l’obtention d’une liste de produits correspondant aux recherches. Le site doit être épuré et accessible à une majorité d’utilisateurs. Les informations ne doivent pas être surchargées. Le site se devra responsive pour permettre une bonne utilisation du site même sur smartphone.<br/>

Un premier affichage de la liste avec uniquement le nom des produits et des marques avec de simples indices de couleurs permettra une lisibilité rapide des principales informations. Il faudrait alors permettre ensuite, au clic d’un utilisateur sur un produit, proposer un affichage complet sur toutes les informations du produit dans une fenêtre style pop-up se superposant à la page et pouvant être quittée par un simple clic hors du cadre.<br/>

Nous ajouterons à ces éléments une barre de recherche visible en permanence ainsi qu’un menu latéral. Ce dernier facilitera la navigation entre les différentes listes de l’utilisateur, les informations relatives à son compte et la page d’accueil.
<br/><br/>

<strong>Back-end:</strong> Nous implémenterons une API REST
Système d’authentification sécurisé
<br/><br/><br/>



<h2><strong>Planification</strong></h2>

définir une feuille de route, avec les phases (ou cycles, ou sprints) et étapes intermédiaires (sous-buts) de développement en vue d’atteindre le but principal (réussir la soutenance).
estimer le volume de travail de chaque phase et des tâches associées,
distribuer cette charge équitablement, en fonction des compétences et responsabilités de chaque membre de l’équipe,
se donner un calendrier prévisionnel avec les dates repères des étapes et des objectifs à atteindre pour celle-ci, collectivement et individuellement.
intégrer dans cet agenda des points intermédiaires réguliers d’équipe, physiques ou à distance, pour faire un point d’avancement sur la phase en cours et préciser les objectifs collectifs et individuels pour le sprint suivant. Une fréquence hebdomadaire est une bonne fréquence.
<br/><br/><br/>
















<h2><strong>Prototype initial</strong></h2>
<br/><br/>
répondre concrètement avec un plan d’action détaillé distribué sur l’ensemble de l’équipe à la question de ‘comment on réalise ce prototype demain ?’.</br></br>



<strong>Sous-ensemble fonctionnel viable:</strong> Un site permettant de rechercher un produit, de l’ajouter à la liste des favoris ou à une liste de produits.<br/><br/>

<strong>Scénario possible d’interaction avec l’utilisateur:</strong><br/>

<ol>
  <li>L’utilisateur se connecte</li>
  <li>Il crée et nomme une liste de produits: courses du 20/11</li>
  <li>Il fait une recherche: purée</li>
  <li>Il sélectionne le produit qui l’intéresse parmi la liste retournée, et accède à sa fiche détaillée: mousseline</li>
  <li>Il l’ajoute à “courses du 20/11”</li>
  <li>Il va consulter cette même liste depuis le menu</li>
</ol>





