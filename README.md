# oc_da-jr_p7_lespetitsplats
Openclassrooms - Développeur d'application - JavaScript React - Projet 7 - Les Petits Plats

## P7 - Développez un algorithme de recherche en JavaScript
### Scénario
Vous êtes freelance et vous venez d’être missionné par l’entreprise “Les petits plats” en temps que Développeur Front-end pour une mission de 3 mois.  
![Logo Les Petits Plats](https://user.oc-static.com/upload/2024/02/20/17084618666158_Capture%20d%E2%80%99e%CC%81cran%202024-02-20%20a%CC%80%2021.44.11.png)   
Après avoir édité des livres de cuisine pendant plusieurs années, l’entreprise a décidé de se lancer dans un nouveau projet : réaliser son propre site de recettes de cuisine à l’instar de Marmiton ou 750g.  
Sandra, cheffe de projet, est en charge de la digitalisation de l'entreprise avec la création de ce site web.  
Pour l’instant, elle travaille uniquement avec des freelances comme vous, avant de créer une équipe en interne pour gérer ce projet.  
Afin de s’assurer que vous avez tout ce qu’il vous faut à disposition, elle vous envoie un message :  

> Je suis ravie de t’avoir dans l’équipe pour cette nouvelle étape du projet.   
> 
> L’équipe Back-end n’étant pas encore formée, nous disposons uniquement d’un [fichier JavaScript contenant un tableau JSON de 50 recettes](https://github.com/OpenClassrooms-Student-Center/PetitsPlats2.0).   
> 
> Tu  trouveras dans [ce dossier 50 images pour les recettes](https://course.oc-static.com/projects/516_JS/P7/Photos+P7+JS+Les+petits+plats.zip). Elles ne sont pas celles définitives mais elles te permettront d’avoir un rendu fidèle à la maquette.  
> 
> Ta première mission sera donc d’implémenter la fonctionnalité de recherche. Tu trouveras ici [la description du cas d’utilisation de recherche](https://course.oc-static.com/projects/516_JS/P7/Cas+d%E2%80%99utilisation+%2303+_+Filtrer+les+recettes+dans+l%E2%80%99interface+utilisateur+-+Front-end+P6+(Algorithms)+.pdf).   
> 
> C’est ce document qui te servira de référence pour tout le développement de cette fonctionnalité.  
> 
> En plus de ça, voici [la maquette de la page sur Figma](https://www.figma.com/file/LY5VQTAqnrAf0bWObOBrt8/Les-petits-plats---Maquette-2.0?type=design&node-id=0%3A1&t=23dNyQrjg9DVtnrM-1), assure-toi de bien respecter le design à la lettre. Notre designer à préparé un prototype pour que tu puisses analyser le fonctionnement du site terminé.   
> 
> Ce que l’on veut avant tout c’est quelque chose de performant car nos utilisateurs veulent une recherche rapide, presque instantanée !  
>
> Ton travail sera transmis au Back-end dans un second temps pour être adapté par leurs soins. C’est pourquoi il faudra que tu leur transmettes un document expliquant bien ton travail.       
> 
> Je te laisse voir comment procéder en détail directement avec Jean-Baptiste.
> 
> _Sandra_  

En fin de matinée, vous recevez une notification Slack de Jean-Baptiste, votre Lead Developer :  

---
> JB
>
> Salut ! Comme tu as pu le voir, la recherche est une fonctionnalité très importante pour l’équipe et on compte sur toi pour la développer d’une manière optimale.  
Dans notre équipe, pour tout algorithme important qu’on développe, on a pour habitude d’en faire deux implémentations différentes pour pouvoir comparer leurs performances et choisir la meilleure. Il faudra donc que tu fasses de même ! Pour ça il faudra que tu crées un document de comparaison qu’on appelle “fiche d’investigation de fonctionnalité”. Nous avons récemment fait ça pour la fonctionnalité ["connexion / inscription" dont voici le résultat](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P6+Algorithms/Fiche+d%E2%80%99investigation+fonctionnalite%CC%81.pdf). Donc réutilise directement le même modèle de document.  
--- 
> Vous  
>  
> Très bien merci. Du coup, tu me conseilles de procéder comment ?  
---
> JB
>
> Alors ce que je te conseille c’est de commencer par implémenter ton interface comme ça tu es débarrassé. Comme pour le reste du site, tu peux utiliser un framework front-end comme Bootstrap ou Tailwind si tu le souhaite mais pas d'autre librairie (attention, n'utilise que les fonctionnalités CSS des librairies, il faudra que tu écrives tout le code JavaScript toi-même). Veille à bien écrire du code qui passe avec succès le validateur W3C.
>
> Puis, côté algorithmes tu peux procéder en 3 étapes.
>
> D’abord, planifie les 2 versions de la fonctionnalité que tu veux tester. Puisque tu vas traiter beaucoup de tableaux, ce serait intéressant de faire une version utilisant les boucles natives (while, for...) et une version en programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce). Pour ça, commence à remplir le document d’investigation de fonctionnalité autant que tu peux pour bien décrire les deux implémentations que tu veux comparer.
>
> Ces deux implémentations doivent se focaliser uniquement sur le champ de recherche principal.
>
> N’oublie pas de faire un schéma, ou "algorigramme", pour chacune des propositions (les deux implémentations peuvent avoir le même algorigramme) afin qu’on comprenne bien l'enchaînement des étapes de chacun des algorithmes, cela sera surtout utile à l’équipe Back-end. Tu peux te baser sur les schémas présents dans la fiche d’investigation de la fonctionnalité de Connexion/Inscription mais utilise le formatage que tu veux. Moi j'utilise [draw.io](https://app.diagrams.net/) pour faire mes schémas, c'est très pratique et gratuit.
--- 
> Vous  
>  
> Et comment je choisis la meilleure version du code du coup ?  
---
> JB
>
> Ça c’est ta troisième et dernière étape. Pour choisir le meilleur algorithme, il faut que tu testes leur performance. Pour ça, tu peux utiliser l’outil de comparaison de performance que tu veux, personnellement j’utilise [Jsben.ch](https://jsben.ch/) pour ce genre d’analyse. Il te donnera le nombre d’opérations par seconde réalisées par chaque script et te permet donc de voir en un clin d’œil quel script est le plus performant. Tu peux tester uniquement la recherche principale (pas besoin d’utiliser les filtres). Ajoute ensuite les résultats à la fiche d’investigation de fonctionnalité que tu auras rédigée. N’oublie pas de terminer le document par la recommandation d’algorithme à garder suite à ton analyse et tes tests.  
--- 
> Vous  
>  
> Parfait, merci pour tes conseils JB. Je me lance !  
--- 
Ça y est, vous avez toutes les informations nécessaires pour démarrer votre travail. C’est parti !  