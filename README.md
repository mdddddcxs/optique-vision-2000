# Optique Vision 2000 — site et espace de gestion

Site statique (aucune étape de build) relié à Supabase (projet `optique-vision-2000`).

## Mettre en ligne sur Vercel
1. Créer un dépôt GitHub et y déposer le contenu de ce dossier.
2. Sur Vercel : Add New → Project → importer le dépôt. Framework : « Other ». Aucune commande de build.

## Ouvrir l'espace de gestion
1. Supabase → Authentication → Users → Add user : créer le compte du personnel (e-mail + mot de passe).
2. Ajouter ce compte à la table `staff` (colonne `user_id`).
3. Sur le site : lien « Espace gestion » en bas de page.

## Avant l'ouverture au public
Compléter les mentions surlignées en jaune dans `confidentialite.html`, `conditions.html` et `retours.html`.
