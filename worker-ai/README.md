# Assistant IA du CV

Worker Cloudflare qui répond aux questions libres sur le profil professionnel d'Adalberto. Le site conserve automatiquement son assistant local si le Worker ou le quota IA est indisponible.

## Déploiement

1. Ouvrir un terminal dans ce dossier.
2. Lancer `npx wrangler login` si nécessaire.
3. Lancer `npx wrangler deploy`.
4. Copier l'URL obtenue, ajouter `/chat`, puis la placer dans `assets/chat/js/ai-config.js`.

Le binding Workers AI `AI` est déclaré dans `wrangler.jsonc`. Aucun jeton secret n'est stocké dans le site.
