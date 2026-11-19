# Optique Vision 2000 — site et espace de gestion

Site statique (aucune étape de build) relié à Supabase (projet `optique-vision-2000`).

## Mettre en ligne sur Vercel
Add New → Project → importer ce dépôt. Framework : « Other ». Aucune commande de build.
`vercel.json` ajoute les en-têtes de sécurité (CSP, anti-encadrement).

## Ouvrir l'espace de gestion
1. Supabase → Authentication → Users → Add user : créer le compte du personnel (e-mail + mot de passe long).
2. Ajouter ce compte à la table `staff` (colonne `user_id`).
3. Sur le site : lien « Espace gestion » en bas de page.

## Réglages Supabase à faire
- Authentication : désactiver l'inscription publique, activer la protection contre les mots de passe divulgués, activer le second facteur pour le personnel.

## Avant l'ouverture au public
Compléter les mentions surlignées en jaune dans `confidentialite.html`, `conditions.html` et `retours.html`.
