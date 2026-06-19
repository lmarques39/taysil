export type Brand = 'KROFTOOLS' | 'JBM' | 'TAYSIL'

export type CategoryId =
  | 'ferramentas'
  | 'mecanica'
  | 'chapa-pintura'
  | 'higiene-seguranca'
  | 'eletricidade'
  | 'lavagens'

export type Product = {
  id: string
  name: string
  brand: Brand
  category: CategoryId
  sub: string
  img: string | null
  desc: string
}

export const PRODUCTS: Product[] = [
  // ─── FERRAMENTAS ───────────────────────────────────────────────────────────

  // KROFTOOLS — Ferramentas Manuais
  { id: 'k-f-01', name: 'Chave de Boca Luneta', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: '/products/krof-chave-boca-luneta.jpg', desc: 'Chave combinada de boca e luneta em aço crómio-vanádio. Acabamento acetinado anti-reflexo e anti-escorregamento.' },
  { id: 'k-f-02', name: 'Chave de Boca', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1579261215_2566b45ec17c2487ad4c7e59f72a43e7.jpg', desc: 'Chave de boca em aço crómio-vanádio com acabamento polido. Disponível em vários tamanhos métricos.' },
  { id: 'k-f-03', name: 'Chave de Boca DIN 3110', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1740755330_dd7806ba3fe93224c754edb7bee70618.jpg', desc: 'Chave de boca normalizada DIN 3110 em aço forjado. Perfil fino para acesso em locais de difícil alcance.' },
  { id: 'k-f-04', name: 'Chave de Parafusos Phillips', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1579261215_f16664d192b9840a726da1f6ea4fed31.jpg', desc: 'Chave Phillips com ponta em aço S2 temperado e cabo ergonómico bimatéria antiderrapante.' },
  { id: 'k-f-05', name: 'Chave de Parafusos Pozidriv', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1579261215_001c5c143d4ee22cae5c29246dd4d4db.jpg', desc: 'Chave Pozidriv com ponta de precisão em aço crómio-vanádio e cabo ergonómico de três componentes.' },
  { id: 'k-f-06', name: 'Chave de Fenda', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1747932749_ed7fb3e305e50898419f3a741ea3bac9.jpg', desc: 'Chave de fenda profissional com haste em aço crómio-vanádio e cabo antiderrapante resistente a solventes.' },
  { id: 'k-f-07', name: 'Chave Torx', brand: 'KROFTOOLS', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://1830019052.rsc.cdn77.org/temp/1579261215_0321e2a2b419c5183bf86521f8bb2cd6.jpg', desc: 'Chave Torx com perfil de encaixe preciso em aço S2 tratado termicamente. Cabo ergonómico tricomponente.' },

  // JBM — Ferramentas Manuais
  { id: 'j-f-01', name: 'Extensor Universal de Chaves 340mm', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: '/products/jbm-extensor-chaves.jpg', desc: 'Extensor articulado universal compatível com catracas ¼", ⅜" e ½". 340 mm de comprimento para acesso a zonas difíceis.' },
  { id: 'j-f-02', name: 'Conjunto de 9 Chaves Torx Extra Longas Coloridas', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: '/products/jbm-chaves-torx.jpg', desc: 'Jogo de 9 chaves Torx extra longas com código de cores por tamanho (T6 a T50) em aço crómio-vanádio tratado.' },
  { id: 'j-f-03', name: 'Conjunto de 9 Chaves Allen Extra Longas com Ponta Esférica', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://files.jbmcamp.com/media/img/54531/54531.jpg', desc: 'Jogo de 9 chaves hexagonais Allen extra longas com ponta esférica e código de cores. Aço crómio-vanádio tratado.' },
  { id: 'j-f-04', name: 'Chave Inglesa 20" / 508mm', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://files.jbmcamp.com/media/img/54098/54098.jpg', desc: 'Chave inglesa ajustável de 508 mm em aço crómio-vanádio. Maxilar polido com ajuste suave e preciso.' },
  { id: 'j-f-05', name: 'Catraca Compacta 1/4" — 72 Dentes 105mm', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://files.jbmcamp.com/media/img/54086/54086.jpg', desc: 'Catraca compacta 1/4" com cabeça de 72 dentes e 105 mm de comprimento. Ideal para espaços confinados.' },
  { id: 'j-f-06', name: 'Catraca Extensível 1/2" 325–425mm Articulada — 72 Dentes', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://files.jbmcamp.com/media/img/52197/52197.jpg', desc: 'Catraca extensível 1/2" de 325 a 425 mm com cabeça articulada de 72 dentes. Elevado binário e alcance variável.' },
  { id: 'j-f-07', name: 'Módulo de 7 Chaves de Caixa com Cabo em T', brand: 'JBM', category: 'ferramentas', sub: 'Ferramentas Manuais', img: 'https://files.jbmcamp.com/media/img/54481/54481_00.png', desc: 'Conjunto de 7 chaves de caixa (7–19 mm) com cabo em T fixo. Aço crómio-vanádio, compacto e ergonómico.' },

  // JBM — Equipamento de Oficina
  { id: 'j-f-08', name: 'Carro de Ferramentas XL 8 Gavetas — Equipado', brand: 'JBM', category: 'ferramentas', sub: 'Equipamento de Oficina', img: 'https://files.jbmcamp.com/media/img/54688/54688.jpg', desc: 'Carro de oficina com 8 gavetas de grande capacidade, rodas giratórias com travão e estrutura em aço com revestimento epóxi.' },

  // ─── MECÂNICA ──────────────────────────────────────────────────────────────

  // KROFTOOLS — Ferramenta Especial de Motor
  { id: 'k-m-01', name: 'Kit de Anilhas em Alumínio 30 pcs (8×5.8×1mm)', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: 'https://1830019052.rsc.cdn77.org/temp/1589379966_2dd26619ff813559e7f2af52fe913e70.jpg', desc: 'Conjunto de 30 anilhas de vedação em alumínio (8×5.8×1 mm). Compatíveis com bujões de cárter de várias marcas.' },
  { id: 'k-m-02', name: 'Anilhas Injetor Cobre Deutz 12 pcs', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: 'https://1830019052.rsc.cdn77.org/temp/1589379963_fb85e1e352b57e012f855a291ea07d71.jpg', desc: 'Kit de 12 anilhas de cobre para injetores Deutz (13.0×7.0×1.5 mm). Alta resistência térmica até 300 °C.' },
  { id: 'k-m-03', name: 'Anilhas Injetor Cobre Mazda 12 pcs', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: 'https://1830019052.rsc.cdn77.org/temp/1589379963_c04d365f1acecd3d16a528a0ada66d9f.jpg', desc: 'Kit de 12 anilhas de cobre para injetores Mazda (13.5×10×2.0 mm). Vedação perfeita para motores diesel diretos.' },
  { id: 'k-m-04', name: 'Bits de Alta Resistência 10×75 H8', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: '/products/krof-bits.jpg', desc: 'Bits de encaixe 10 mm em aço S2 temperado, hexagonal H8, comprimento 75 mm. Alta resistência ao torque em uso profissional.' },
  { id: 'k-m-05', name: 'Anilhas Injetor Cobre Mercedes 12 pcs', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: 'https://1830019052.rsc.cdn77.org/temp/1589379962_e8cb6f69f49aacc4aa5179f04e5b0ed1.jpg', desc: 'Kit de 12 anilhas de cobre para injetores Mercedes (15.0×7.0×1.5 mm). Para motores OM611, OM646 e similares.' },
  { id: 'k-m-06', name: 'Anilhas Injetor Cobre Fiat 12 pcs', brand: 'KROFTOOLS', category: 'mecanica', sub: 'Ferramenta Especial de Motor', img: 'https://1830019052.rsc.cdn77.org/temp/1589379964_a0cf3294ff5f263adb3e2863a88e8577.jpg', desc: 'Kit de 12 anilhas de cobre para injetores Fiat (15.0×7.5×1.5 mm). Para motores 1.3 JTD, 1.9 JTD e MultiJet.' },

  // JBM — Consumíveis
  { id: 'j-m-01', name: 'Kit 295 pcs — Clipes, Anéis de Retenção e Pinos', brand: 'JBM', category: 'mecanica', sub: 'Consumíveis e Vedantes', img: 'https://files.jbmcamp.com/media/img/54943/54943.jpg', desc: 'Conjunto de 295 peças incluindo clipes, anéis de retenção, contrapinos e pinos variados. Organizado em caixa modular.' },
  { id: 'j-m-02', name: 'Estojo de Anilhas Planas e de Pressão 350 pcs', brand: 'JBM', category: 'mecanica', sub: 'Consumíveis e Vedantes', img: 'https://files.jbmcamp.com/media/img/54938/54938.jpg', desc: 'Sortido de 350 anilhas planas e de pressão em aço galvanizado, em caixa de 18 compartimentos. Tamanhos M3 a M12.' },
  { id: 'j-m-03', name: 'Estojo de Anilhas Grower e Dentadas 720 pcs', brand: 'JBM', category: 'mecanica', sub: 'Consumíveis e Vedantes', img: 'https://files.jbmcamp.com/media/img/54939/54939.jpg', desc: 'Kit com 720 anilhas de pressão grower e dentadas em aço. Caixa com 24 compartimentos, tamanhos M3 a M12.' },
  { id: 'j-m-04', name: 'Estojo de Anilhas para Bujão do Cárter Ford 120 pcs', brand: 'JBM', category: 'mecanica', sub: 'Consumíveis e Vedantes', img: 'https://files.jbmcamp.com/media/img/54918/54918.jpg', desc: 'Kit de 120 anilhas de vedação para bujão de cárter compatível com modelos Ford. Organizado por dimensão.' },

  // JBM — Lubrificação
  { id: 'j-m-05', name: 'Bomba Dispensadora de Diesel com Pistola (230V)', brand: 'JBM', category: 'mecanica', sub: 'Lubrificação e Combustível', img: 'https://files.jbmcamp.com/media/img/53610/53610.jpg', desc: 'Bomba elétrica 230 V para distribuição de combustível diesel, com pistola automática e medidor de caudal.' },
  { id: 'j-m-06', name: 'Bomba para Diesel e AUS32 — Tanque Duplo 330+50L', brand: 'JBM', category: 'mecanica', sub: 'Lubrificação e Combustível', img: 'https://files.jbmcamp.com/media/img/54877/54877.jpg', desc: 'Sistema de distribuição com tanque duplo 330+50 L para diesel e AUS32 (AdBlue). Bombas independentes com contadores.' },
  { id: 'j-m-07', name: 'Carretel de Mangueira para Óleo 15m', brand: 'JBM', category: 'mecanica', sub: 'Lubrificação e Combustível', img: '/products/jbm-carretel-oleo.jpg', desc: 'Carretel de parede com 15 m de mangueira para distribuição de óleo. Retração automática e ligação BSP ½".' },

  // JBM — Hidráulica
  { id: 'j-m-08', name: 'Macaco Hidráulico 3T Baixo Perfil', brand: 'JBM', category: 'mecanica', sub: 'Ferramentas Hidráulicas', img: '/products/jbm-macaco-hidraulico.jpg', desc: 'Macaco hidráulico de 3 toneladas com altura mínima de 80 mm. Ideal para viaturas desportivas e rebaixadas.' },

  // ─── CHAPA E PINTURA ───────────────────────────────────────────────────────

  // KROFTOOLS — Reparação de Carroçaria
  { id: 'k-c-01', name: 'Saca Molas de Portas', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1764178897_c811bc0811ea528fd370cf869c2b3963.jpg', desc: 'Ferramenta para remoção de molas de retenção em portas de automóvel. Compatível com a maioria das marcas europeias e asiáticas.' },
  { id: 'k-c-02', name: 'Saca Molas de Portas Nº2', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1691139098_700511aa05a1c8285d3794a69500aa42.jpg', desc: 'Modelo Nº2 de saca molas, com geometria otimizada para molas de maior dimensão em carrinhas e SUV.' },
  { id: 'k-c-03', name: 'Disco de Borracha para Remoção de Adesivos', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1643275070_16b4f1a8b54caf33847e73b3d9b8d415.jpg', desc: 'Disco de borracha para remoção de autocolantes, fita cola e resíduos de carroçaria. Para usar com berbequim.' },
  { id: 'k-c-04', name: 'Chave para Desmontar Puxador de Porta', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1731421895_32f71daf57bf475962e5b6e412243540.jpg', desc: 'Ferramenta especializada para desmontagem de puxadores de porta sem danificar o revestimento interior.' },
  { id: 'k-c-05', name: 'Alicate Saca Molas', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1756306077_e507df6d021502ab39e32ddc2a2e5387.jpg', desc: 'Alicate profissional para extração de molas de retenção em portas, tampas e painéis. Aço crómio-vanádio forjado.' },
  { id: 'k-c-06', name: 'Rebites Plásticos 100 pcs', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://1830019052.rsc.cdn77.org/temp/1741370544_477e0167289d1adfd7da44191d12f16f.jpg', desc: 'Sortido de 100 rebites plásticos para fixação de painéis e revestimentos de carroçaria. Vários tamanhos.' },

  // KROFTOOLS — Substituição de Vidros
  { id: 'k-c-07', name: 'Agulha p/ Fio Cortar Para-Brisas 300mm', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Substituição de Vidros', img: '/products/krof-agulha-parabrisa.jpg', desc: 'Agulha de 300 mm para corte do cordão de poliuretano em operações de substituição de para-brisas. Lâmina em aço inox.' },

  // KROFTOOLS — Restauração de Faróis
  { id: 'k-c-08', name: 'Kit Restauração de Faróis', brand: 'KROFTOOLS', category: 'chapa-pintura', sub: 'Restauração de Faróis', img: '/products/krof-kit-farois.jpg', desc: 'Kit completo para restauração de faróis oxidados. Inclui lixas progressivas, composto de polimento e verniz UV de proteção.' },

  // JBM — Reparação de Carroçaria
  { id: 'j-c-01', name: 'Kit Reparação de Amolgadelas 11 pcs', brand: 'JBM', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://files.jbmcamp.com/media/img/55116/55116_PROV.jpg', desc: 'Kit de 11 peças para reparação de amolgadelas sem pintura (PDR). Inclui ventosas, alavancas e martelos de carroçaria.' },
  { id: 'j-c-02', name: 'Ventosa de Extração com Cabo Ø70mm', brand: 'JBM', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: '/products/jbm-ventosa.jpg', desc: 'Ventosa de sucção Ø70 mm com cabo ergonómico para extração e reposicionamento de painéis de carroçaria.' },
  { id: 'j-c-03', name: 'Alicate de Pressão', brand: 'JBM', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://files.jbmcamp.com/media/img/50577/50577_1.jpg', desc: 'Alicate de pressão profissional com mandíbulas ajustáveis para fixação e conformação de peças de carroçaria.' },
  { id: 'j-c-04', name: 'Suporte Móvel para Para-Choques', brand: 'JBM', category: 'chapa-pintura', sub: 'Reparação de Carroçaria', img: 'https://files.jbmcamp.com/media/img/54579/54579_00.jpg', desc: 'Carrinho móvel para armazenamento e transporte de para-choques durante trabalhos de pintura ou carroçaria.' },

  // JBM — Substituição de Vidros
  { id: 'j-c-05', name: 'Kit Substituição de Para-Brisas com Maleta', brand: 'JBM', category: 'chapa-pintura', sub: 'Substituição de Vidros', img: 'https://files.jbmcamp.com/media/img/55012/55012.jpg', desc: 'Conjunto completo de ferramentas para substituição de para-brisas, incluindo fios de corte e instalação em maleta.' },

  // ─── HIGIENE E SEGURANÇA ───────────────────────────────────────────────────

  // KROFTOOLS — EPI
  { id: 'k-h-01', name: 'Luvas c/ Palma em Poliuretano CE EN388 T9', brand: 'KROFTOOLS', category: 'higiene-seguranca', sub: 'EPI', img: 'https://1830019052.rsc.cdn77.org/temp/1769785920_b4fadebbc1a6ffc5b24d18c2b3f6f155.jpg', desc: 'Luvas de trabalho tamanho 9 com palma em poliuretano. Certificação CE EN388-2016, dorso em nylon respirável.' },
  { id: 'k-h-02', name: 'Luvas c/ Palma em Poliuretano CE EN388 T8', brand: 'KROFTOOLS', category: 'higiene-seguranca', sub: 'EPI', img: 'https://1830019052.rsc.cdn77.org/temp/1769785749_abc2b2e2b329dddf79e41b7271adfb53.jpg', desc: 'Luvas de trabalho tamanho 8 com palma em poliuretano. Certificação CE EN388-2016, dorso em nylon respirável.' },
  { id: 'k-h-03', name: 'Luvas c/ Palma em Poliuretano CE EN388 T10', brand: 'KROFTOOLS', category: 'higiene-seguranca', sub: 'EPI', img: 'https://1830019052.rsc.cdn77.org/temp/1769785807_3f45f20a0c73124d806ba0900e6156af.jpg', desc: 'Luvas de trabalho tamanho 10 com palma em poliuretano. Certificação CE EN388-2016, dorso em nylon respirável.' },
  { id: 'k-h-04', name: 'Luvas de Mecânica KROFTOOLS EN388 CE CAT II', brand: 'KROFTOOLS', category: 'higiene-seguranca', sub: 'EPI', img: 'https://1830019052.rsc.cdn77.org/temp/1626798340_5f43b9ccf19c3d6f6830ead37a4c2ad5.jpg', desc: 'Luvas de proteção mecânica certificadas EN388 CE CAT II. Palma reforçada em nitrilo, dorso ventilado.' },

  // JBM — EPI
  { id: 'j-h-01', name: 'Luvas com Palma Reforçada de Nitrilo T.11', brand: 'JBM', category: 'higiene-seguranca', sub: 'EPI', img: 'https://files.jbmcamp.com/media/img/51398N/51398N.jpg', desc: 'Luvas resistentes com palma reforçada de nitrilo, tamanho 11. Alta proteção a óleos, combustíveis e produtos químicos.' },
  { id: 'j-h-02', name: 'Luvas com Palma Reforçada de Nitrilo T.10', brand: 'JBM', category: 'higiene-seguranca', sub: 'EPI', img: 'https://files.jbmcamp.com/media/img/51632N/51632N.jpg', desc: 'Luvas resistentes com palma reforçada de nitrilo, tamanho 10. Alta proteção a óleos, combustíveis e produtos químicos.' },
  { id: 'j-h-03', name: 'Luvas com Palma Reforçada de Nitrilo T.8', brand: 'JBM', category: 'higiene-seguranca', sub: 'EPI', img: 'https://files.jbmcamp.com/media/img/51633/51633.jpg', desc: 'Luvas resistentes com palma reforçada de nitrilo, tamanho 8. Alta proteção a óleos, combustíveis e produtos químicos.' },
  { id: 'j-h-04', name: 'Luvas Descartáveis de Nitrilo Pretas 100 un.', brand: 'JBM', category: 'higiene-seguranca', sub: 'EPI', img: 'https://files.jbmcamp.com/media/img/54178/54178_01.jpg', desc: 'Luvas descartáveis de nitrilo pretas sem pó, resistentes a óleos e químicos. Embalagem de 100 unidades, T:L 7.0 mil.' },
  { id: 'j-h-05', name: 'Luvas Descartáveis Nitrilo Verdes — Textura Diamante 100 un.', brand: 'JBM', category: 'higiene-seguranca', sub: 'EPI', img: 'https://files.jbmcamp.com/media/img/54370/54369-54370-54371.jpg', desc: 'Luvas descartáveis verdes em nitrilo com textura diamante para maior aderência. 100 unidades, T:L 7.0 mil.' },

  // JBM — Vestuário Profissional
  { id: 'j-h-06', name: 'Colete de Trabalho Cinzento-Preto', brand: 'JBM', category: 'higiene-seguranca', sub: 'Vestuário Profissional', img: '/products/jbm-colete.jpg', desc: 'Colete multibolsos profissional em tecido ripstop cinzento e preto. Múltiplos bolsos funcionais e ajuste por velcro.' },

  // ─── ELETRICIDADE ──────────────────────────────────────────────────────────

  // KROFTOOLS — Iluminação Profissional
  { id: 'k-e-01', name: 'Gambiarra 5W LED com Carregador USB', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: '/cat-eletricidade.jpg', desc: 'Lâmpada de inspeção LED 5W recarregável via USB. Cabo de 5 m, gancho de suspensão e proteção em borracha.' },
  { id: 'k-e-02', name: 'Lanterna Caneta COB LED', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1734608001_2e993a8f4933eac94918616f08e1bff5.jpg', desc: 'Lanterna de bolso estilo caneta com LED COB de alta luminosidade, alimentada por pilhas. Clip de bolso incluído.' },
  { id: 'k-e-03', name: 'Lâmpada LED Touch 500mm', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1599207750_1c2bffc15c2c59a6bf9349809a6be98b.jpg', desc: 'Lâmpada de inspeção LED de 500 mm com ativação por toque. Ímans e gancho de suspensão integrados.' },
  { id: 'k-e-04', name: 'Gambiarra LED Recarregável Magnética 100lm', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1771499108_71191488ccc7cd0691321e20f9e73148.jpg', desc: 'Gambiarra 1 W LED recarregável com base magnética. 100 lúmens, carga via USB, gancho flexível de posicionamento.' },
  { id: 'k-e-05', name: 'Lanterna Pen Recarregável 200lm', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1696351845_0490c9ef00d29ef61a2dbbaf2e98d8e6.jpg', desc: 'Lanterna tipo caneta recarregável por USB com 200 lúmens. Compacta, com clip de bolso e foco regulável.' },
  { id: 'k-e-06', name: 'Gambiarra de Bolso COB + 3 LEDs', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1589379539_a724ea5008eee45dbadc624b82ca2d01.jpg', desc: 'Gambiarra de bolso com duplo sistema de iluminação: LED COB lateral e 3 LEDs frontais. Alimentada a pilhas.' },
  { id: 'k-e-07', name: 'Gambiarra de Inspeção Ultra Fina 400lm', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1696351696_3ac6e59ec2bc264c0f6baf5984b420da.jpg', desc: 'Gambiarra de inspeção de perfil ultra fino com 400 lúmens. Recarregável via USB-C, ímans para fixação.' },
  { id: 'k-e-08', name: 'Gambiarra de Cabeça LED COB c/ Sensor de Movimento 450lm', brand: 'KROFTOOLS', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://1830019052.rsc.cdn77.org/temp/1771499007_bfdae6085130283c48bb06cbea1ddef7.jpg', desc: 'Gambiarra de fixar na cabeça com LED COB de 450 lúmens e sensor de movimento para ativação automática.' },

  // JBM — Iluminação Profissional
  { id: 'j-e-01', name: 'Lâmpada de Bolso LED 120lm', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: '/products/jbm-lanterna.jpg', desc: 'Lanterna compacta de bolso com 120 lúmens. Foco regulável, resistente a impactos, alimentada por 3 pilhas AAA.' },
  { id: 'j-e-02', name: 'Foco LED Portátil Solar Imantado 800lm', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: '/products/jbm-foco-solar.jpg', desc: 'Projector LED portátil de 800 lúmens com carregamento solar e base magnética integrada. Autonomia até 6 h.' },
  { id: 'j-e-03', name: 'Holofote LED 30W com Sensor de Movimento', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://files.jbmcamp.com/media/img/54968/54968.jpg', desc: 'Holofote exterior LED 30 W com sensor de movimento infravermelho. Resistente a intempéries (IP65), 2400 lm.' },
  { id: 'j-e-04', name: 'Lâmpada LED para Capô 1200lm', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://files.jbmcamp.com/media/img/53570/53570.jpg', desc: 'Lâmpada LED articulada para fixação no capô com 1200 lúmens. Iluminação de zona de trabalho sem sombras.' },
  { id: 'j-e-05', name: 'Farol de LED 2880lm — Quadrado', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://files.jbmcamp.com/media/img/55090/55090.jpg', desc: 'Farol LED quadrado de alta potência com 2880 lúmens para iluminação de área em oficina ou exterior.' },
  { id: 'j-e-06', name: 'Foco LED 1450lm — Quadrado', brand: 'JBM', category: 'eletricidade', sub: 'Iluminação Profissional', img: 'https://files.jbmcamp.com/media/img/52302/52302.jpg', desc: 'Foco LED quadrado de 1450 lúmens com suporte articulado. Ideal para iluminação de trabalho em oficina.' },

  // JBM — Ferramentas Elétricas
  { id: 'j-e-07', name: 'Chave de Impacto Brushless 1/2" 1300Nm', brand: 'JBM', category: 'eletricidade', sub: 'Ferramentas Elétricas', img: 'https://files.jbmcamp.com/media/img/60044/60044.jpg', desc: 'Chave de impacto a bateria com motor brushless 1/2" e 1300 Nm de binário máximo. Leve e de alto desempenho.' },
  { id: 'j-e-08', name: 'Chave de Impacto Brushless 1/2" 1000Nm c/ Estojo', brand: 'JBM', category: 'eletricidade', sub: 'Ferramentas Elétricas', img: 'https://files.jbmcamp.com/media/img/60051/60051_0000.jpg', desc: 'Chave de impacto brushless 1/2" com 1000 Nm e estojo de transporte profissional. Bateria de lítio de longa duração.' },

  // ─── LAVAGENS ──────────────────────────────────────────────────────────────

  { id: 'j-l-01', name: 'Carretel de Mangueira de Água 15+1.5m', brand: 'JBM', category: 'lavagens', sub: 'Equipamento de Lavagem', img: '/products/jbm-carretel-mangueira.jpg', desc: 'Carretel de parede com 15 m de mangueira principal e 1.5 m de extensão. Retração automática e ligação rápida incluída.' },
  { id: 't-l-01', name: 'Champô Automóvel Profissional', brand: 'TAYSIL', category: 'lavagens', sub: 'Limpeza Exterior', img: null, desc: 'Champô de alta espuma para lavagem manual. Formulação pH neutro, seguro em ceras e revestimentos cerâmicos.' },
  { id: 't-l-02', name: 'Desengordurante Universal em Spray', brand: 'TAYSIL', category: 'lavagens', sub: 'Limpeza Exterior', img: null, desc: 'Desengordurante em spray para remoção de óleo, graxa e betume em motor, jantes e carroçaria. Seguro em plásticos.' },
  { id: 't-l-03', name: 'Limpa-Jantes Concentrado', brand: 'TAYSIL', category: 'lavagens', sub: 'Limpeza Exterior', img: null, desc: 'Produto concentrado para limpeza profunda de jantes em liga leve e aço. Remove pó de travão e sujidade acumulada.' },
  { id: 't-l-04', name: 'Microfibras de Lavagem (Pack 10)', brand: 'TAYSIL', category: 'lavagens', sub: 'Consumíveis de Lavagem', img: null, desc: 'Pack de 10 panos de microfibra 40×40 cm para secagem e polimento. Alta absorção, laváveis a 60 °C.' },
]
