# PFA : Plateforme intelligente de détection des fraudes bancaires

Détection de fraudes bancaires et suivi des transactions suspectes par Intelligence Artificielle
et analyse temporelle des graphes transactionnels.

## Objectifs
- Classifier chaque transaction (suspecte / normale) avec un score de prédiction
- Alertes en temps réel (API + WebSocket)
- Interface d'investigation : l'employé confirme la fraude ou clôture l'alerte
- Graphes de transactions et chronologie des opérations par client
- Rapports et statistiques par client (un client peut avoir plusieurs comptes)

## Jeu de données
**PaySim** (transactions de mobile money simulées), sur Kaggle :
« Synthetic Financial Datasets For Fraud Detection ».

1. Télécharger `paysim.csv` depuis Kaggle
2. Le placer dans `data/paysim.csv` (ce dossier n'est pas versionné)

## Installation
```bash
python -m venv .venv
source .venv/bin/activate        # Windows : .venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook
```

## Structure
```
data/          jeu de données (non versionné)
notebooks/     exploration et modèles
src/           feature engineering, entraînement, graphes
backend/       API FastAPI + WebSocket
frontend/      tableau de bord et investigation
models/        modèles entraînés
docs/          rapport LaTeX, slides, diagrammes
```

## Avancement
- [ ] Exploration du dataset (`notebooks/01_exploration.ipynb`)
- [ ] Modèles de classification
- [ ] Graphe transactionnel
- [ ] Backend temps réel
- [ ] Frontend (dashboard, alertes, investigation)
- [ ] Rapport et présentation
