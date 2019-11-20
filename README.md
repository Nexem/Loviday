# Loviday
Asynchronous Programming project repo

Link to the chart on google drive : 
https://docs.google.com/document/d/1JTXnYhJt1o7ouNftORzqDJryLtW5tXUKg0cixRo0xXI/edit?usp=sharing


Loviday



Sujet: Loviday est un site web permettant à ses utilisateurs de faire des recherches sur des aliments afin d’en savoir davantage sur leur composition. A cette fonctionnalité s’ajouteront d’autres possibilités telles que l’ajout d’aliments à une liste de favoris. Nous les expliquerons plus tard dans ce document.


Problème: Aujourd’hui, nombreux sont ceux qui essaient de manger plus sainement et qui veulent davantage de transparence sur les aliments qu’ils ingèrent. Toutefois, il est très long de lire la composition de chaque paquet de gâteau avant de trouver celui qui sera parfait à consommer. Aussi, même en lisant la composition, pour être capable de savoir quels composants sont nocifs ou bénéfiques, cela demande des connaissances que la plupart des gens n’ont pas.


Cible: Les consommateurs souhaitant un moyen de comparaison efficace et rapide entre les produits proposés par les différentes marques sur le marché. 


Solution: Notre projet a pour but de faciliter l’accès aux informations demandées par de plus en plus de personnes. Diverses applications mobiles, telles que Yuka, permettent actuellement de scanner les produits que l’on peut trouver dans les rayons de supermarchés. Toutefois, elles ne permettent pas de faire des recherches manuelles. Ainsi, si l’on veut trouver le meilleur paquet de gâteau pour sa santé, nous nous retrouvons obligés de scanner un à un les paquets se trouvant dans le rayon. Notre solution permet donc de faire des recherches en amont. Cela permet aux consommateurs de gagner du temps lorsqu’ils font leurs courses.
Notre site permettrait également aux consommateurs de prendre conscience des alternatives existantes à leurs moyens de consommations habituels.












Concept : Notre solution reposera sur l’utilisation de l’API OpenFoodFact. Elle proposera plusieurs fonctionnalités.

Recherche de produits à partir d’un mot clé (ex: Jus d’orange, pâte à tartiner). Possibilité d’ajouter des filtres pour obtenir un résultat plus pertinent. Le résultat de la recherche retourne, dans l’ordre, les produits les plus sains sur des critères de nutrition, transformation, additifs, présence d'allergène. Les produits les plus sains seraient alors mis en avant pour le consommateur souhaitant adapter ses achats.

Authentification de l’utilisateur avec stockage des deux listes expliquées ci-dessous. Cela lui permettra de pouvoir se connecter à partir de plusieurs plateformes et de simplement retrouver ses données.

Création d’une liste de produits permettant à l’utilisateur de la consulter facilement lorsqu’il fait ses courses. Ainsi, il peut visualiser rapidement quels sont les produits dont il a besoin et les repérer dans le rayon grâce à la photo mise à sa disposition sur l’application.
L’utilisateur peut créer, modifier et supprimer autant de listes de produits qu’il souhaite.

Ajout de produits à une liste de “Favoris” (indépendante de la liste de produits expliquée précédemment). A partir d’une recherche, l’utilisateur peut sélectionner et ajouter à ses favoris les produits qu’il souhaite garder de côté. Par exemple, il pourra facilement compléter sa liste de produit à partir de ses favoris.


Contraintes: Étant donné que les données mises à disposition sur OpenFoodFacts ne sont pas toujours suffisamment renseignées, seuls les produits contenants les informations nutritives seront affichés à l’utilisateur.


Objectifs : Exploiter l’API écrite pour le projet de M1 de notre groupe afin de retourner les produits souhaités. Il faudra par la suite appliquer un filtre sur la recherche afin d’affiner les critères voulus.

Une programmation asynchrone sera également nécessaire afin d’actualiser en temps réel la liste des produits sur la page et ainsi éviter les temps de chargement (potentiellement beaucoup de données à traiter).


Visuel / ergonomie : Créer un site web ergonomique et simple d’utilisation. Il est important de minimiser les étapes entre l’arrivée sur le site et l’obtention d’une liste de produits correspondant aux recherches. Le site doit être épuré et accessible à une majorité d’utilisateurs. Les informations ne doivent pas être surchargées. Le site se devra responsive pour permettre une bonne utilisation du site même sur smartphone.

Un premier affichage de la liste avec uniquement le nom des produits et des marques avec de simples indices de couleurs permettra une lisibilité rapide des principales informations. Il faudrait alors permettre ensuite, au clic d’un utilisateur sur un produit, proposer un affichage complet sur toutes les informations du produit dans une fenêtre style pop-up se superposant à la page et pouvant être quittée par un simple clic hors du cadre.

Nous ajouterons à ces éléments une barre de recherche visible en permanence ainsi qu’un menu latéral. Ce dernier facilitera la navigation entre les différentes listes de l’utilisateur, les informations relatives à son compte et la page d’accueil.

Back-end : Nous implémenterons une API REST
Système d’authentification sécurisé

IDEE : c’est pas ouf de se limite seulement à faire une recherche d’aliments
Faire un moteur de recherche c’est bien mais la vraie plus value ça peut être de faire son panier de courses par exemple

Je me disais : on utilise une API Carrefour, Auchan, Casino, pour indiquer sur chaque produit dans quelles grandes enseignes il est dispo et à quel prix



on peut proposer de rajouter des aliments aux favoris (ceux que l’on veut facilement retrouver)
mais on peut aussi proposer aux utilisateurs de créer leur liste de course: petite photo du produit et le nom. Ca leur permettrait de facilement repérer les produits en rayon. (moins difficile)
Après, si vraiment on a du temps, on pourra faire le lien avec l’API d’un magasin, puis avec d’autres magasins


Après j’ai pensé à un truc : on pourrait faire un export de la liste vers une appli memo. Genre OneNote :
Cliquer ici 😋













Planifier:
définir une feuille de route, avec les phases (ou cycles, ou sprints) et étapes intermédiaires (sous-buts) de développement en vue d’atteindre le but principal (réussir la soutenance).
estimer le volume de travail de chaque phase et des tâches associées,
distribuer cette charge équitablement, en fonction des compétences et responsabilités de chaque membre de l’équipe,
se donner un calendrier prévisionnel avec les dates repères des étapes et des objectifs à atteindre pour celle-ci, collectivement et individuellement.
intégrer dans cet agenda des points intermédiaires réguliers d’équipe, physiques ou à distance, pour faire un point d’avancement sur la phase en cours et préciser les objectifs collectifs et individuels pour le sprint suivant. Une fréquence hebdomadaire est une bonne fréquence.

















Prototype initial:

répondre concrètement avec un plan d’action détaillé distribué sur l’ensemble de l’équipe à la question de ‘comment on réalise ce prototype demain ?’.



Sous-ensemble fonctionnel viable: Un site permettant de rechercher un produit, de l’ajouter à la liste des favoris ou à une liste de produits.

Scénario possible d’interaction avec l’utilisateur:

1- L’utilisateur se connecte
2- Il crée et nomme une liste de produits: courses du 20/11
3- Il fait une recherche: purée
4- Il sélectionne le produit qui l’intéresse parmi la liste retournée, et accède à sa fiche détaillée: mousseline
5- Il l’ajoute à “courses du 20/11”
6- Il va consulter cette même liste depuis le menu






