

## Página "Tipos de Pele" — Adolescente, Jovem e Madura

### O que será criado

Uma nova página `/tipos-de-pele` com três seções dedicadas a cada faixa etária, explicando as características da pele, cuidados recomendados e produtos sugeridos.

### Estrutura da Página

1. **Hero/Banner** — Título "Tipos de Pele por Idade" com subtítulo explicativo
2. **Três cards/seções expandidas** para cada tipo:
   - **Pele Adolescente** (13-19 anos) — oleosidade, acne, poros dilatados; rotina simples com limpeza e proteção solar
   - **Pele Jovem** (20-35 anos) — prevenção, hidratação, primeiros sinais; cuidados com antioxidantes e FPS
   - **Pele Madura** (35+ anos) — firmeza, linhas, manchas; foco em retinol, ácido hialurônico e anti-idade
3. Cada seção terá: ícone, características principais, dicas de cuidado e link para produtos filtrados
4. **CTA final** — botão "Fazer análise de pele"

### Arquivos a criar/editar

| Arquivo | Ação |
|---|---|
| `src/pages/SkinTypes.tsx` | Criar página completa com as 3 seções |
| `src/App.tsx` | Adicionar rota `/tipos-de-pele` |
| `src/components/Navbar.tsx` | Atualizar link "Tipos de Pele" para apontar para `/tipos-de-pele` |

### Padrões seguidos
- Mesmo layout com `Navbar` + `Footer`
- Animações com `framer-motion` (fade-in no scroll)
- Estilo visual consistente: cards arredondados, cores pastel, tipografia existente
- Responsivo (grid de 1 coluna no mobile, 3 no desktop)

