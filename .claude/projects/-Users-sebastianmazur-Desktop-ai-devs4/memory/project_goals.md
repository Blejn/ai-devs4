---
name: AI Devs 4 course project goals
description: Project purpose, architecture goals, and tooling plans for AI Devs 4 course repo
type: project
---

Monorepo na kurs AI Devs 4 - rozwiązywanie zadań z kursu z naciskiem na naukę i dobrą architekturę.

**Stack:** pnpm monorepo → packages/api (Express+TS+Anthropic SDK), packages/web (Next.js), packages/shared (Zod types)

**Cele:**
- Rozwiązywać zadania z kursu (task branches: task01/people, etc.)
- Budować solidną architekturę backendową (services, tasks separation)
- Integrować narzędzia AI/ML toolchain: Langfuse, Promptfoo, Unsloth
- Frontend do śledzenia progresu (later)

**Why:** Sebastian chce wyciągnąć max z kursu - nie tylko rozwiązać zadania, ale nauczyć się patterns i narzędzi produkcyjnych.

**How to apply:** Przy każdym zadaniu - naprowadzać na rozwiązanie, wyjaśniać koncepty, sugerować architekturalne ulepszenia. Nie dawać gotowego kodu - raczej pseudokod, podpowiedzi, pytania naprowadzające.
