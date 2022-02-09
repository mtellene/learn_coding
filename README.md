# Qu'est-ce que c'est ?

Ce projet est un site pour apprendre les bases de la programmation Python notamment l'utilisation de fonctions et la notion d'instructions. Il s'adresse aux élèves de 2ndes SNT ou bien de 1ère NSI.

Le site se compose de 3 niveaux.

## Niveau 1 (**TODO**)

**Fonctionnement du niveau 1** : Les élèves ont une grille avec un sorcier sur la gauche de l'écran et un code Python sur la droite. Les élèves doivent déterminer sur quelle case arrivera le sorcier à la fin de l'exécution du code.

## Niveau 2

Les élèves ont une grille avec un sorcier et un chaudron sur la gauche et une zone de texte à droite. Les élèves doivent écrire le code Python dans la zone de texte afin de permettre au sorcier d'atteindre le chaudron.

Afin d'y arriver, les élèves ont à disposition 4 fonctions : haut, bas, gauche, droite. La fonction permet d'indiquer dans quelle direction le sorcier doit aller et l'argument permet d'indiquer le nombre de cases dont il faudra se déplacer 

Une fois le code écrit, les élèves peuvent valider leur code et voir le sorcier se déplacer sur la grille. Une fois l'exécution terminée, les élèves ont un retour sur leur code (soit il est bon, soit il faut le changer).

## Niveau 3 (**TODO**)

**Fonctionnement du niveau 3** : Les élèves ont une grille avec un sorcier, un chaudron et des éléments à récupérer et à droite une zone de texte. Les élèves doivent écrire le code Python permettant de récupérer tous les éléments **puis** d'arriver jusqu'au chaudron.


# Bon à savoir

1. Les structures `if`, `while`, `for` et toutes autres commandes que `droite`, `gauche`, `haut` et `bas` ne sont pas reconnus

2. Le projet n'est pas encore terminé

3. Organisation du projet : 
	* `code/pages` contient les pages HTML
	* `code/scripts` contient les script Javascript nécessaire au bon fonctionnement du projet
	* `code/style` contient le fichier CSS
	* `ressources` contient les ressources nécessaires : images, grille originale, ...


# Comment utiliser ce projet avec ses élèves ?

Vous pouvez lancer la commande `https://github.com/mtellene/learn_coding.git` afin de cloner tout le projet. La page de départ se trouve dans `code/pages/index.html`, les élèves doivent l'ouvrir et choisir le niveau qui les intéresse.

# Améliorations

Si vous trouvez des bugs ou si vous avez des idées d'améliorations, n'hésitez pas à m'en faire part.
