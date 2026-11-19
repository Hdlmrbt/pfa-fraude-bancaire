# Parcours du front-end pour préparer la conception UML

Ce document décrit le prototype Sentinel et les responsabilités attendues du futur backend. Il sert de support au binôme chargé de la conception ; il ne remplace pas les diagrammes demandés dans le cahier des charges.

## Acteurs

- Analyste : consulter les opérations et scores, explorer les relations, examiner une période, traiter les alertes et interroger l'assistant.
- Administrateur : gérer la configuration, importer les données et, dans le futur backend, gérer les comptes et les autorisations.
- Client bancaire : destinataire externe d'une notification. Aucun accès à la plateforme interne.

## Parcours à modéliser

### Importation

Administrateur → écran Importation → sélection CSV → vérification des colonnes et des valeurs → exclusion des doublons → enregistrement → confirmation du nombre de lignes. En cas d'erreur, le fichier est rejeté avant ajout des transactions. Le backend devra gérer les imports volumineux et tracer les traitements.

### Investigation et décision

Analyste → Centre d'alertes → filtre/recherche → ouverture d'un dossier → consultation du score, des comptes et du motif → exploration éventuelle du graphe → ajout d'une observation → changement de statut → sauvegarde de l'historique. La confirmation exige une observation dans le prototype. Le backend devra contrôler les droits, conserver l'auteur et l'horodatage et gérer les mises à jour concurrentes.

### Exploration relationnelle et temporelle

Analyste → choix de la période → choix d'un compte → consultation des liens directs et des flux → sélection d'un voisin ou d'une transaction → détail du dossier. Les transferts individuels doivent rester identifiables même si l'affichage regroupe les liens. Le backend devra calculer les indicateurs et motifs chronologiques sans accéder à des événements futurs.

### Assistant

Analyste → saisie d'une question → détermination des informations requises → récupération des données autorisées → réponse avec références ou indication d'information manquante. Le prototype simule ces étapes localement ; le futur service devra vérifier les autorisations avant la récupération et la génération.

### Notifications

Dans le prototype : analyste → dossier d'une alerte → notification de test → enregistrement d'un envoi simulé → consultation dans la cloche.

Cible du cahier des charges : alerte satisfaisant aux conditions → service de notification automatique → canal de test ou simulé → enregistrement du statut d'envoi lié à l'alerte. L'envoi automatique reste à implémenter.

## Entités candidates pour le diagramme de classes

| Entité | Attributs principaux | Relations à prévoir |
| --- | --- | --- |
| Utilisateur | id, nom, rôle, état | décisions, observations, imports |
| Client bancaire | id, coordonnées de test | comptes, notifications |
| Compte bancaire | id, client_id | transactions émises et reçues |
| Transaction | id, source_id, cible_id, montant, type, date | résultats d'analyse, alertes |
| Résultat d'analyse | id, transaction_id, modèle/version, date de calcul, score, motifs | transaction, traitement |
| Alerte | id, date, niveau, statut, motifs | une ou plusieurs transactions, historique |
| Observation | id, texte, date, auteur_id | alerte, utilisateur |
| Historique d'alerte | id, ancien statut, nouveau statut, date, auteur_id | alerte |
| Notification | id, alerte_id, destinataire de test, canal, statut, date | alerte, client |
| Import | id, fichier, auteur_id, date, état, compteurs | transactions, utilisateur |
| Conversation / Message | id, rôle du message, contenu, date, références | utilisateur, conversation |

Le prototype associe simplement un dossier d'alerte à un identifiant de transaction. Le modèle final doit également permettre les alertes portant sur un groupe de transactions, comme demandé dans le cahier des charges.

## Contrats API proposés, à valider pendant la conception

| Méthode et route | Responsabilité |
| --- | --- |
| POST /api/auth/login | Authentifier et ouvrir une session |
| GET /api/auth/me | Récupérer le profil et les permissions |
| GET /api/dashboard?from=&to= | Indicateurs et séries temporelles |
| GET /api/transactions?q=&risk=&from=&to=&page= | Consultation filtrée et paginée |
| GET /api/transactions/{id} | Détails et analyses disponibles |
| POST /api/imports | Import validé côté serveur |
| GET /api/imports/{id} | État et rapport d'import |
| GET /api/accounts/{id}/graph?from=&to= | Nœuds, liens, transactions et limites d'affichage |
| GET /api/accounts/{id}/timeline?from=&to= | Chronologie et indicateurs temporels |
| GET /api/alerts | Recherche et pagination des alertes |
| PATCH /api/alerts/{id} | Transition de statut autorisée |
| POST /api/alerts/{id}/observations | Observation et auteur authentifié |
| GET /api/alerts/{id}/history | Historique traçable |
| GET /api/notifications | Consultation des envois et statuts |
| POST /api/assistant/messages | Réponse avec références et contrôles d'accès |
| GET/PATCH /api/settings | Paramètres contrôlés par rôle |
| GET/POST/PATCH /api/users | Gestion administrative des utilisateurs |

Les dates, unités de temps, niveaux de risque, transitions de statuts, erreurs, pagination et formats de réponse doivent être fixés ensemble avant le branchement. L'API constitue la frontière de sécurité : le masquage d'un écran dans le navigateur ne suffit pas.
