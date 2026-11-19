# Sentinel — Front-end de démonstration

Application web en français, en HTML, CSS et JavaScript natif. Aucune dépendance npm à installer. Node.js 20 ou supérieur suffit pour le serveur local.

## Démarrage

Depuis la racine du projet :

```powershell
cd frontend
npm run dev
```

Ouvrir http://127.0.0.1:5173 dans un navigateur. Vérification de syntaxe : `npm run check`.

## Écrans disponibles

- Vue d’ensemble : indicateurs calculés à partir des transactions locales, histogramme, répartition du risque et alertes récentes.
- Transactions : recherche par identifiant, compte ou type, filtre de risque, pagination, dossier détaillé et export CSV.
- Graphe transactionnel : sélection d’un compte, exploration des voisins, volumes entrants et sortants et transactions individuelles.
- Analyse temporelle : activité par jour, agrégats par compte et chronologie récente.
- Centre d’alertes : signalements selon le seuil configuré, observations, décisions et historique local.
- Assistant : simulation à réponses structurées sur une transaction, un compte ou les alertes ; références aux données utilisées.
- Importation, profil administrateur : CSV standard ou PaySim, validation avant import, doublons ignorés et exemple téléchargeable.
- Administration : présentation des profils et réglage du seuil d’alerte et des notifications de test.
- Notifications : simulation explicite, déclenchée manuellement depuis un dossier, avec historique ; aucun envoi réel.

## Données et limites

84 transactions fictives, entre le 13 et le 19 novembre 2026, sont incluses. Les périodes proposées correspondent à cette semaine de démonstration. Les imports en dehors de cette période sont conservés mais ne sont pas affichés par ces filtres.

Les transactions importées, décisions, préférences et notifications sont conservées dans le `localStorage` de ce navigateur. L'historique du chat reste en mémoire jusqu'au rechargement. Pour réinitialiser la démonstration, supprimer les clés commençant par `sentinel.` dans les outils du navigateur.

Les scores et motifs initiaux sont fictifs. Un score importé vient du fichier ; sans score, la valeur est 0 en attendant le backend. Le graphe représente des relations directes regroupées ; il n'exécute aucun détecteur de cycles. Les séries temporelles affichent des agrégats sans détecteur d'anomalies. Le chatbot utilise des réponses déterministes et n'appelle aucun LLM. Le choix de profil simule les accès ; ce n'est pas une authentification et il ne protège pas les données côté navigateur.

Les notifications automatiques, la détection réelle, les droits sécurisés, la gestion complète des comptes utilisateurs et les analyses avancées restent à réaliser dans le backend. Aucun renseignement bancaire réel ne doit être utilisé dans cette démonstration.

Les polices Google Fonts sont facultatives : en l'absence de réseau, une police système est utilisée.

## Préparation du backend

Les données et les fonctions de consultation sont regroupées dans `app.js`. Remplacer progressivement l'accès aux tableaux et au stockage local par des appels à une API Python. Le fichier `../docs/frontend-parcours.md` décrit les parcours et les contrats API proposés pour la conception UML. Ces contrats sont des propositions, aucun endpoint n'est implémenté ici.
