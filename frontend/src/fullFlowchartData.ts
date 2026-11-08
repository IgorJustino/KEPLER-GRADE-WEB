export type BoxColorCategory = 'amarelo' | 'verde' | 'rosa' | 'laranja';

export interface FlowSubject {
  code: string;
  name: string;
  semester: number;
  row: number; // Linha horizontal fixa (0 a 6) idêntica ao Fluxograma Oficial FGA/UnB
  credits: number;
  hours: number;
  creditBlocks?: [number, number, number, number]; // [Teoria, Prática, Extensão, Estudo] ex: [2, 4, 0, 6]
  boxCategory: BoxColorCategory; // 'amarelo' (Ciclo Básico), 'verde' (Específicas Software), 'rosa' (Optativas), 'laranja' (PI / Estágio / TCC)
  category: 'Obrigatória' | 'Eletiva' | 'Optativa';
  prereqs: string[]; // Códigos das matérias necessárias antes
  dependents: string[]; // Códigos das matérias que esta destrava diretamente
  status?: 'concluida' | 'cursando' | 'elegivel' | 'bloqueada';
}

export interface CourseFlowchart {
  courseCode: string;
  courseName: string;
  campus: string;
  totalCredits: number;
  semestersCount: number;
  semesterCredits?: number[]; // Créditos no rodapé de cada semestre
  subjects: FlowSubject[];
}

/**
 * FLUXOGRAMA OFICIAL DE ENGENHARIA DE SOFTWARE — Faculdade UnB Gama (FGA)
 * Baseado fielmente no documento oficial da UnB (10 semestres, 232 créditos totais).
 *
 * Significado das cores oficiais das caixas:
 * - AMARELO ('amarelo'): Ciclo Básico / Núcleo Comum das Engenharias da FGA (Matemática, Física, Eletrônica Digital, Gestão/Economia/Humanidades)
 * - VERDE ('verde'): Núcleo Específico Obrigatório de Engenharia de Software e Ciência da Computação
 * - ROSA ('rosa'): Disciplinas Optativas / Cadeia de Seletividade (incluindo Desenvolvimento de Software no 2º sem)
 * - LARANJA / SALMÃO ('laranja'): Projetos Integradores (PI 1 e PI 2), Estágio Supervisionado e TCC (TCC 1 e TCC 2)
 */
export const SOFTWARE_FLOWCHART: CourseFlowchart = {
  courseCode: 'FGA-SW',
  courseName: 'Engenharia de Software',
  campus: 'Faculdade UnB Gama (FGA)',
  totalCredits: 232,
  semestersCount: 10,
  semesterCredits: [24, 24, 26, 24, 24, 24, 24, 26, 22, 14],
  subjects: [
    // =========================================================================
    // 1º SEMESTRE (24 créditos — Todos Amarelos: Ciclo Básico Engenharias)
    // =========================================================================
    {
      code: 'MAT - 113034',
      name: 'Cálculo 1',
      semester: 1,
      row: 0,
      credits: 6,
      hours: 90,
      creditBlocks: [2, 4, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332', 'CIC - 117536'],
      status: 'concluida',
    },
    {
      code: 'CIC - 113476',
      name: 'Algoritmos e Programação de Computadores',
      semester: 1,
      row: 1,
      credits: 6,
      hours: 90,
      creditBlocks: [4, 2, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: ['OPT - DESENV', 'FGA - 195341', 'FGA - 193704'],
      status: 'concluida',
    },
    {
      code: 'FGA - 199176',
      name: 'Desenho Industrial Assistido por Computador',
      semester: 1,
      row: 2,
      credits: 6,
      hours: 90,
      creditBlocks: [2, 4, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'FGA - 198005',
      name: 'Engenharia e Ambiente',
      semester: 1,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 2],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'FGA - 198013',
      name: 'Introdução à Engenharia',
      semester: 1,
      row: 4,
      credits: 2,
      hours: 30,
      creditBlocks: [2, 0, 0, 2],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'concluida',
    },

    // =========================================================================
    // 2º SEMESTRE (24 créditos)
    // =========================================================================
    {
      code: 'MAT - 113042',
      name: 'Cálculo 2',
      semester: 2,
      row: 0,
      credits: 6,
      hours: 90,
      creditBlocks: [4, 2, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113034'],
      dependents: ['FGA - 195413'],
      status: 'concluida',
    },
    {
      code: 'IFD - 118001',
      name: 'Física 1',
      semester: 2,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 0],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113034'],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'IFD - 118010',
      name: 'Física 1 Experimental',
      semester: 2,
      row: 2,
      credits: 2,
      hours: 30,
      creditBlocks: [0, 2, 0, 0],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'MAT - 113093',
      name: 'Introdução à Álgebra Linear',
      semester: 2,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: ['FGA - 119482', 'FGA - 119466'],
      status: 'concluida',
    },
    {
      code: 'FGA - 195332',
      name: 'Probabilidade e Estatística Aplicada à Engenharia',
      semester: 2,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113034'],
      dependents: ['FGA - 193321'],
      status: 'concluida',
    },
    {
      code: 'OPT - DESENV',
      name: 'Desenvolvimento de Software',
      semester: 2,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: ['CIC - 113476'],
      dependents: [],
      status: 'concluida',
    },

    // =========================================================================
    // 3º SEMESTRE (26 créditos)
    // =========================================================================
    {
      code: 'FGA - 195413',
      name: 'Métodos Numéricos para Engenharia',
      semester: 3,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 6],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113042'],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'FGA - 193321',
      name: 'Engenharia Econômica',
      semester: 3,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 4],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['FGA - 195332'],
      dependents: ['FGA - 201626'],
      status: 'concluida',
    },
    {
      code: 'FGA - 199133',
      name: 'Humanidades e Cidadania',
      semester: 3,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 2],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'concluida',
    },
    {
      code: 'FGA - 119482',
      name: 'Teoria de Eletrônica Digital 1',
      semester: 3,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 4],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113093'],
      dependents: ['FGA - 193674'],
      status: 'concluida',
    },
    {
      code: 'FGA - 119466',
      name: 'Prática de Eletrônica Digital 1',
      semester: 3,
      row: 4,
      credits: 2,
      hours: 30,
      creditBlocks: [0, 2, 0, 2],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['MAT - 113093'],
      dependents: ['FGA - 193674'],
      status: 'concluida',
    },
    {
      code: 'FGA - 195341',
      name: 'Orientação a Objetos',
      semester: 3,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['CIC - 113476'],
      dependents: ['FGA - 193640', 'FGA - 203904', 'FGA - 193861'],
      status: 'concluida',
    },
    {
      code: 'FGA - 1085',
      name: 'Matemática Discreta 1',
      semester: 3,
      row: 6,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: [],
      dependents: ['FGA - 1086'],
      status: 'concluida',
    },

    // =========================================================================
    // 4º SEMESTRE (24 créditos)
    // =========================================================================
    {
      code: 'FGA - 201626',
      name: 'Gestão da Produção e Qualidade',
      semester: 4,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 2],
      boxCategory: 'amarelo',
      category: 'Obrigatória',
      prereqs: ['FGA - 193321'],
      dependents: ['FGA - 208698'],
      status: 'cursando',
    },
    {
      code: 'FGA - 193640',
      name: 'Métodos de Desenvolvimento de Software',
      semester: 4,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 195341'],
      dependents: ['FGA - 201316', 'FGA - 201308', 'FGA - 206580'],
      status: 'cursando',
    },
    {
      code: 'FGA - 193704',
      name: 'Estruturas de Dados 1',
      semester: 4,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['CIC - 113476'],
      dependents: ['FGA - 101095', 'FGA - 103209', 'CIC - 117536'],
      status: 'cursando',
    },
    {
      code: 'FGA - 193674',
      name: 'Fundamentos de Arquiteturas de Computadores',
      semester: 4,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 119482', 'FGA - 119466'],
      dependents: ['FGA - 201286'],
      status: 'cursando',
    },
    {
      code: 'FGA - 1086',
      name: 'Matemática Discreta 2',
      semester: 4,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 1085'],
      dependents: ['FGA - 193631'],
      status: 'cursando',
    },
    {
      code: 'FGA - 193861',
      name: 'Projeto Integrador de Engenharia 1',
      semester: 4,
      row: 6,
      credits: 4,
      hours: 60,
      creditBlocks: [0, 4, 0, 6],
      boxCategory: 'laranja',
      category: 'Obrigatória',
      prereqs: ['FGA - 195341'],
      dependents: ['FGA - 208175'],
      status: 'elegivel',
    },

    // =========================================================================
    // 5º SEMESTRE (24 créditos — Todos Verdes)
    // =========================================================================
    {
      code: 'FGA - 201316',
      name: 'Interação Humano Computador',
      semester: 5,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193640'],
      dependents: ['FGA - 208698'],
      status: 'elegivel',
    },
    {
      code: 'FGA - 201308',
      name: 'Requisitos de Software',
      semester: 5,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193640'],
      dependents: ['FGA - 203882'],
      status: 'elegivel',
    },
    {
      code: 'FGA - 193631',
      name: 'Sistemas de Banco de Dados 1',
      semester: 5,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 1086'],
      dependents: ['FGA - 115576'],
      status: 'elegivel',
    },
    {
      code: 'FGA - 201286',
      name: 'Fundamentos de Sistemas Operacionais',
      semester: 5,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193674'],
      dependents: ['FGA - 203912', 'FGA - 1091'],
      status: 'elegivel',
    },
    {
      code: 'FGA - 101095',
      name: 'Compiladores 1',
      semester: 5,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193704'],
      dependents: ['FGA - 203904'],
      status: 'elegivel',
    },
    {
      code: 'FGA - 103209',
      name: 'Estruturas de Dados 2',
      semester: 5,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193704'],
      dependents: ['FGA - 206610'],
      status: 'elegivel',
    },

    // =========================================================================
    // 6º SEMESTRE (24 créditos — Todos Verdes)
    // =========================================================================
    {
      code: 'FGA - 208698',
      name: 'Qualidade de Software 1',
      semester: 6,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 201626', 'FGA - 201316'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 206580',
      name: 'Testes de Software',
      semester: 6,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193640'],
      dependents: ['FGA - 206601', 'FGA - 206598'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 203882',
      name: 'Arquitetura e Desenho de Software',
      semester: 6,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 201308'],
      dependents: ['FGA - 206601'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 203912',
      name: 'Fundamentos de Redes de Computadores',
      semester: 6,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 201286'],
      dependents: ['FGA - 1091', 'FGA - 206610'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 115576',
      name: 'Sistemas de Banco de Dados 2',
      semester: 6,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 193631'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'CIC - 117536',
      name: 'Projeto e Análise de Algoritmos',
      semester: 6,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [4, 0, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['MAT - 113034', 'FGA - 193704'],
      dependents: [],
      status: 'bloqueada',
    },

    // =========================================================================
    // 7º SEMESTRE (24 créditos)
    // =========================================================================
    {
      code: 'FGA - 206601',
      name: 'Técnicas de Programação em Plataformas Emergentes',
      semester: 7,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 206580', 'FGA - 203882'],
      dependents: ['FGA - 203874'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 203904',
      name: 'Paradigmas de Programação',
      semester: 7,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 195341', 'FGA - 101095'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 1091',
      name: 'Fundamentos de Sistemas Embarcados',
      semester: 7,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 6],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 201286', 'FGA - 203912'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 206610',
      name: 'Programação para Sistemas Paralelos e Distribuídos',
      semester: 7,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 203912', 'FGA - 103209'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'OPT - 07A',
      name: 'Optativa',
      semester: 7,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'OPT - 07B',
      name: 'Optativa',
      semester: 7,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },

    // =========================================================================
    // 8º SEMESTRE (26 créditos)
    // =========================================================================
    {
      code: 'FGA - 203874',
      name: 'Engenharia de Produto de Software',
      semester: 8,
      row: 0,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 206601'],
      dependents: ['FGA - 208175'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 206598',
      name: 'Gerência de Configuração e Evolução de Software',
      semester: 8,
      row: 1,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'verde',
      category: 'Obrigatória',
      prereqs: ['FGA - 206580'],
      dependents: [],
      status: 'bloqueada',
    },
    {
      code: 'OPT - 08A',
      name: 'Optativa',
      semester: 8,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'FGA - 102512',
      name: 'Estágio Supervisionado',
      semester: 8,
      row: 5,
      credits: 14,
      hours: 210,
      creditBlocks: [0, 0, 14, 14],
      boxCategory: 'laranja',
      category: 'Obrigatória',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },

    // =========================================================================
    // 9º SEMESTRE (22 créditos)
    // =========================================================================
    {
      code: 'OPT - 09A',
      name: 'Optativa',
      semester: 9,
      row: 2,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'OPT - 09B',
      name: 'Optativa',
      semester: 9,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'OPT - 09C',
      name: 'Optativa',
      semester: 9,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'FGA - 101141',
      name: 'Trabalho de Conclusão de Curso 1',
      semester: 9,
      row: 5,
      credits: 4,
      hours: 60,
      creditBlocks: [0, 4, 0, 8],
      boxCategory: 'laranja',
      category: 'Obrigatória',
      prereqs: [],
      dependents: ['FGA - 102415'],
      status: 'bloqueada',
    },
    {
      code: 'FGA - 208175',
      name: 'Projeto Integrador de Engenharia 2',
      semester: 9,
      row: 6,
      credits: 6,
      hours: 90,
      creditBlocks: [0, 6, 0, 6],
      boxCategory: 'laranja',
      category: 'Obrigatória',
      prereqs: ['FGA - 193861', 'FGA - 203874'],
      dependents: [],
      status: 'bloqueada',
    },

    // =========================================================================
    // 10º SEMESTRE (14 créditos — Total: 232 créditos)
    // =========================================================================
    {
      code: 'OPT - 10A',
      name: 'Optativa',
      semester: 10,
      row: 3,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'OPT - 10B',
      name: 'Optativa',
      semester: 10,
      row: 4,
      credits: 4,
      hours: 60,
      creditBlocks: [2, 2, 0, 4],
      boxCategory: 'rosa',
      category: 'Optativa',
      prereqs: [],
      dependents: [],
      status: 'elegivel',
    },
    {
      code: 'FGA - 102415',
      name: 'Trabalho de Conclusão de Curso 2',
      semester: 10,
      row: 5,
      credits: 6,
      hours: 90,
      creditBlocks: [0, 6, 0, 12],
      boxCategory: 'laranja',
      category: 'Obrigatória',
      prereqs: ['FGA - 101141'],
      dependents: [],
      status: 'bloqueada',
    },
  ],
};

// Gerador para os demais cursos mantendo o padrão visual das 4 cores (Amarelo, Verde, Rosa, Laranja)

/**
 * FLUXOGRAMA OFICIAL DE ENGENHARIA AEROESPACIAL — Faculdade UnB Gama (FGA)
 * Baseado na matriz oficial da FGA/UnB (10 semestres, 246 créditos).
 */
export const AERO_FLOWCHART: CourseFlowchart = {
  courseCode: 'FGA-AERO',
  courseName: 'Engenharia Aeroespacial',
  campus: 'Faculdade UnB Gama (FGA)',
  totalCredits: 246,
  semestersCount: 10,
  semesterCredits: [24, 24, 26, 26, 26, 26, 26, 24, 24, 20],
  subjects: [
    // 1º Semestre (Ciclo Básico FGA)
    { code: 'MAT - 113034', name: 'Cálculo 1', semester: 1, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332'], status: 'concluida' },
    { code: 'CIC - 113476', name: 'Algoritmos e Programação de Computadores', semester: 1, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 195413'], status: 'concluida' },
    { code: 'FGA - 199176', name: 'Desenho Industrial Assistido por Computador', semester: 1, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 198005', name: 'Engenharia e Ambiente', semester: 1, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 198013', name: 'Introdução à Engenharia', semester: 1, row: 4, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 199133', name: 'Humanidades e Cidadania', semester: 1, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },

    // 2º Semestre (Ciclo Básico FGA)
    { code: 'MAT - 113042', name: 'Cálculo 2', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['MAT - 113051', 'FGA - 195413', 'FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118001', name: 'Física 1', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118010', name: 'Física 1 Experimental', semester: 2, row: 2, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: [], status: 'concluida' },
    { code: 'MAT - 113093', name: 'Introdução à Álgebra Linear', semester: 2, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 195332', name: 'Probabilidade e Estatística Aplicada', semester: 2, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 193321'], status: 'concluida' },
    { code: 'QUI - 118028', name: 'Química Geral e Experimental para Engenharia', semester: 2, row: 5, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 0035'], status: 'concluida' },

    // 3º Semestre
    { code: 'MAT - 113051', name: 'Cálculo 3', semester: 3, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0041', 'FGA - 0043'], status: 'cursando' },
    { code: 'FGA - 0021', name: 'Mecânica dos Sólidos 1', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042', 'IFD - 118001'], dependents: ['FGA - 0042', 'FGA - 0055'], status: 'cursando' },
    { code: 'FGA - 195413', name: 'Métodos Numéricos para Engenharia', semester: 3, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042', 'CIC - 113476'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 193321', name: 'Engenharia Econômica', semester: 3, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 0035', name: 'Materiais de Construção para Engenharia', semester: 3, row: 4, credits: 4, hours: 60, creditBlocks: [3, 1, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['QUI - 118028'], dependents: ['FGA - 0064'], status: 'cursando' },
    { code: 'FGA - 201626', name: 'Gestão da Produção e Qualidade', semester: 3, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195413', 'FGA - 193321'], dependents: ['FGA - 193861'], status: 'elegivel' },

    // 4º Semestre
    { code: 'FGA - 0041', name: 'Métodos Matemáticos para Engenharia', semester: 4, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0051'], status: 'elegivel' },
    { code: 'FGA - 0042', name: 'Elasticidade e Mecânica dos Sólidos 2', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0021'], dependents: ['FGA - 0072'], status: 'bloqueada' },
    { code: 'FGA - 0043', name: 'Fenômenos de Transporte', semester: 4, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0054', 'FGA - 0062'], status: 'bloqueada' },
    { code: 'FGA - 0044', name: 'Eletricidade e Magnetismo Aplicados', semester: 4, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0053'], status: 'bloqueada' },
    { code: 'FGA - 193861', name: 'Projeto Integrador de Engenharia 1', semester: 4, row: 4, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 201626'], dependents: ['FGA - 208175'], status: 'bloqueada' },
    { code: 'FGA - 0045', name: 'Segurança do Trabalho na Engenharia', semester: 4, row: 5, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'elegivel' },

    // 5º Semestre
    { code: 'FGA - 0051', name: 'Teoria Eletromagnética e Antenas', semester: 5, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0041'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0052', name: 'Matemática Aplicada a Sistemas Aeroespaciais', semester: 5, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0041'], dependents: ['FGA - 0063'], status: 'bloqueada' },
    { code: 'FGA - 0054', name: 'Dinâmica dos Fluidos e Gases', semester: 5, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0061'], status: 'bloqueada' },
    { code: 'FGA - 0053', name: 'Circuitos Eletrônicos para Aeroespacial', semester: 5, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0044'], dependents: ['FGA - 0074'], status: 'bloqueada' },
    { code: 'FGA - 0055', name: 'Dinâmica de Mecanismos e Sistemas', semester: 5, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0021'], dependents: ['FGA - 0071'], status: 'bloqueada' },
    { code: 'FGA - 0056', name: 'Termodinâmica Aplicada a Voo', semester: 5, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0083'], status: 'bloqueada' },

    // 6º Semestre
    { code: 'FGA - 0061', name: 'Aerodinâmica de Sistemas Aeroespaciais', semester: 6, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0054'], dependents: ['FGA - 0073'], status: 'bloqueada' },
    { code: 'FGA - 0062', name: 'Transferência de Calor e Radiação Térmica', semester: 6, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0083'], status: 'bloqueada' },
    { code: 'FGA - 0063', name: 'Sistemas de Controle em Aeroespacial', semester: 6, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0052'], dependents: ['FGA - 0074'], status: 'bloqueada' },
    { code: 'FGA - 0064', name: 'Materiais Aeroespaciais e Compósitos', semester: 6, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0035'], dependents: ['FGA - 0072'], status: 'bloqueada' },
    { code: 'OPT - AER01', name: 'Optativa 1', semester: 6, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AER02', name: 'Optativa 2', semester: 6, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 7º Semestre
    { code: 'FGA - 0071', name: 'Dinâmica de Veículos Aeroespaciais', semester: 7, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0055'], dependents: ['FGA - 0081'], status: 'bloqueada' },
    { code: 'FGA - 0072', name: 'Mecânica de Estruturas Aeroespaciais', semester: 7, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0042', 'FGA - 0064'], dependents: ['FGA - 0082'], status: 'bloqueada' },
    { code: 'FGA - 0073', name: 'Mecânica do Voo Atmosférico', semester: 7, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0061'], dependents: ['FGA - 0084'], status: 'bloqueada' },
    { code: 'FGA - 0074', name: 'Projeto de Sistemas de Controle e Aviônica', semester: 7, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0063', 'FGA - 0053'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AER03', name: 'Optativa 3', semester: 7, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AER04', name: 'Optativa 4', semester: 7, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 8º Semestre
    { code: 'FGA - 0081', name: 'Mecânica do Voo Espacial e Órbitas', semester: 8, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0071'], dependents: ['FGA - 0092'], status: 'bloqueada' },
    { code: 'FGA - 0082', name: 'Dinâmica de Estruturas e Aeroelasticidade', semester: 8, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0072'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0083', name: 'Propulsão Aeroespacial e Turbomáquinas', semester: 8, row: 2, credits: 5, hours: 75, creditBlocks: [4, 1, 0, 5], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0056', 'FGA - 0062'], dependents: ['FGA - 0091'], status: 'bloqueada' },
    { code: 'FGA - 0084', name: 'Projeto de Aeronaves e Sistemas de Voo', semester: 8, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0073'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 208175', name: 'Projeto Integrador de Engenharia 2', semester: 8, row: 4, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 193861'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AER05', name: 'Optativa 5', semester: 8, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 9º Semestre
    { code: 'FGA - 101141', name: 'Trabalho de Conclusão de Curso 1', semester: 9, row: 0, credits: 4, hours: 60, creditBlocks: [0, 4, 0, 8], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: ['FGA - 102415'], status: 'bloqueada' },
    { code: 'FGA - 0091', name: 'Propulsão Química e Motores-Foguete', semester: 9, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0083'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0092', name: 'Projeto de Missões e Observação da Terra', semester: 9, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0081'], dependents: ['FGA - 0101'], status: 'bloqueada' },
    { code: 'FGA - 102512', name: 'Estágio Supervisionado', semester: 9, row: 3, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AER06', name: 'Optativa 6', semester: 9, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 10º Semestre
    { code: 'FGA - 102415', name: 'Trabalho de Conclusão de Curso 2', semester: 10, row: 0, credits: 6, hours: 90, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 101141'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0101', name: 'Engenharia de Sistemas Aeroespaciais', semester: 10, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0092'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0102', name: 'Propulsão Elétrica e Satélites', semester: 10, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0091'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AER07', name: 'Optativa 7', semester: 10, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AER08', name: 'Optativa 8', semester: 10, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
  ],
};

/**
 * FLUXOGRAMA OFICIAL DE ENGENHARIA ELETRÔNICA — Faculdade UnB Gama (FGA)
 * Baseado na matriz oficial da FGA/UnB (10 semestres, 245 créditos).
 */
export const ELETRONICA_FLOWCHART: CourseFlowchart = {
  courseCode: 'FGA-ELET',
  courseName: 'Engenharia Eletrônica',
  campus: 'Faculdade UnB Gama (FGA)',
  totalCredits: 245,
  semestersCount: 10,
  semesterCredits: [24, 24, 26, 26, 26, 26, 26, 24, 23, 20],
  subjects: [
    // 1º Semestre (Ciclo Básico FGA)
    { code: 'MAT - 113034', name: 'Cálculo 1', semester: 1, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332'], status: 'concluida' },
    { code: 'CIC - 113476', name: 'Introdução à Ciência da Computação / APC', semester: 1, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 195413', 'FGA - 193704'], status: 'concluida' },
    { code: 'FGA - 198005', name: 'Engenharia e Ambiente', semester: 1, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'QUI - 118028', name: 'Química Geral e Experimental', semester: 1, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'MAT - 113093', name: 'Introdução à Álgebra Linear', semester: 1, row: 4, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 119482'], status: 'concluida' },

    // 2º Semestre
    { code: 'MAT - 113042', name: 'Cálculo 2', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['MAT - 113051', 'FGA - 195413', 'FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118001', name: 'Física 1', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118010', name: 'Física 1 Experimental', semester: 2, row: 2, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: [], status: 'concluida' },
    { code: 'FGA - 199176', name: 'Desenho Industrial Assistido por Computador', semester: 2, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 199133', name: 'Humanidades e Cidadania', semester: 2, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 198013', name: 'Introdução à Engenharia', semester: 2, row: 5, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },

    // 3º Semestre
    { code: 'MAT - 113051', name: 'Cálculo 3', semester: 3, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0041'], status: 'cursando' },
    { code: 'FGA - 193321', name: 'Engenharia Econômica', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 195332', name: 'Probabilidade e Estatística Aplicada', semester: 3, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 193321', 'FGA - 0075'], status: 'cursando' },
    { code: 'FGA - 0021', name: 'Mecânica dos Sólidos para Engenharia', semester: 3, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042', 'IFD - 118001'], dependents: [], status: 'cursando' },
    { code: 'FGA - 119482', name: 'Teoria de Eletrônica Digital 1', semester: 3, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113093'], dependents: ['FGA - 0076'], status: 'cursando' },
    { code: 'FGA - 119466', name: 'Prática de Eletrônica Digital 1', semester: 3, row: 5, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113093'], dependents: ['FGA - 0076'], status: 'cursando' },

    // 4º Semestre
    { code: 'FGA - 195413', name: 'Métodos Numéricos para Engenharia', semester: 4, row: 0, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042', 'CIC - 113476'], dependents: ['FGA - 201626'], status: 'elegivel' },
    { code: 'IFD - 118036', name: 'Física Moderna e Eletromagnetismo', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0058'], status: 'elegivel' },
    { code: 'FGA - 0041', name: 'Métodos Matemáticos para Engenharia', semester: 4, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0066'], status: 'bloqueada' },
    { code: 'FGA - 0045', name: 'Engenharia de Segurança do Trabalho', semester: 4, row: 3, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'FGA - 193704', name: 'Estruturas de Dados e Algoritmos 1', semester: 4, row: 4, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['CIC - 113476'], dependents: ['FGA - 0076'], status: 'bloqueada' },
    { code: 'FGA - 0048', name: 'Materiais Elétricos e Magnéticos', semester: 4, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0067'], status: 'bloqueada' },

    // 5º Semestre
    { code: 'FGA - 201626', name: 'Gestão da Produção e Qualidade', semester: 5, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195413', 'FGA - 193321'], dependents: ['FGA - 193861'], status: 'bloqueada' },
    { code: 'FGA - 0057', name: 'Eletricidade Aplicada (Circuitos)', semester: 5, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0065'], status: 'bloqueada' },
    { code: 'FGA - 0043', name: 'Fenômenos de Transporte', semester: 5, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0058', name: 'Teoria Eletromagnética', semester: 5, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['IFD - 118036'], dependents: ['FGA - 0068'], status: 'bloqueada' },
    { code: 'FGA - 193861', name: 'Projeto Integrador de Engenharia 1', semester: 5, row: 4, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 201626'], dependents: ['FGA - 208175'], status: 'bloqueada' },

    // 6º Semestre
    { code: 'FGA - 0065', name: 'Circuitos Eletrônicos 1', semester: 6, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0057'], dependents: ['FGA - 0077'], status: 'bloqueada' },
    { code: 'FGA - 0066', name: 'Sistemas de Controle Linear', semester: 6, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0041'], dependents: ['FGA - 0086'], status: 'bloqueada' },
    { code: 'FGA - 0067', name: 'Métodos Experimentais para Eletrônica', semester: 6, row: 2, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 2], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0048'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0068', name: 'Princípios de Comunicação Analógica', semester: 6, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0058'], dependents: ['FGA - 0078'], status: 'bloqueada' },
    { code: 'OPT - ELE01', name: 'Optativa 1', semester: 6, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 7º Semestre
    { code: 'FGA - 0075', name: 'Processamento Digital de Sinais (DSP)', semester: 7, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 0103'], status: 'bloqueada' },
    { code: 'FGA - 0076', name: 'Sistemas Microprocessados e Embarcados', semester: 7, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 119482', 'FGA - 193704'], dependents: ['FGA - 0087'], status: 'bloqueada' },
    { code: 'FGA - 0077', name: 'Circuitos Eletrônicos 2', semester: 7, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0065'], dependents: ['FGA - 0088'], status: 'bloqueada' },
    { code: 'FGA - 0078', name: 'Comunicações Digitais', semester: 7, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0068'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ELE02', name: 'Optativa 2', semester: 7, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 8º Semestre
    { code: 'FGA - 0086', name: 'Projeto de Sensores e Instrumentação', semester: 8, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0066'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0087', name: 'Projeto de Circuitos Integrados e FPGA', semester: 8, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0076'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0088', name: 'Circuitos Eletrônicos 3 e RF', semester: 8, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0077'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 208175', name: 'Projeto Integrador de Engenharia 2', semester: 8, row: 3, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 193861'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ELE03', name: 'Optativa 3', semester: 8, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 9º Semestre
    { code: 'FGA - 101141', name: 'Trabalho de Conclusão de Curso 1', semester: 9, row: 0, credits: 4, hours: 60, creditBlocks: [0, 4, 0, 8], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: ['FGA - 102415'], status: 'bloqueada' },
    { code: 'FGA - 102512', name: 'Estágio Supervisionado', semester: 9, row: 1, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ELE04', name: 'Optativa 4', semester: 9, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 10º Semestre
    { code: 'FGA - 102415', name: 'Trabalho de Conclusão de Curso 2', semester: 10, row: 0, credits: 6, hours: 90, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 101141'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0103', name: 'Processamento Digital de Imagens e Visão', semester: 10, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0075'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ELE05', name: 'Optativa 5', semester: 10, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - ELE06', name: 'Optativa 6', semester: 10, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
  ],
};

/**
 * FLUXOGRAMA OFICIAL DE ENGENHARIA AUTOMOTIVA — Faculdade UnB Gama (FGA)
 * Baseado na matriz oficial da FGA/UnB (10 semestres, 244 créditos).
 */
export const AUTOMOTIVA_FLOWCHART: CourseFlowchart = {
  courseCode: 'FGA-AUTO',
  courseName: 'Engenharia Automotiva',
  campus: 'Faculdade UnB Gama (FGA)',
  totalCredits: 244,
  semestersCount: 10,
  semesterCredits: [24, 24, 26, 26, 26, 26, 24, 24, 24, 20],
  subjects: [
    // 1º Semestre (Ciclo Básico FGA)
    { code: 'MAT - 113034', name: 'Cálculo 1', semester: 1, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332'], status: 'concluida' },
    { code: 'CIC - 113476', name: 'Algoritmos e Programação de Computadores', semester: 1, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 195413'], status: 'concluida' },
    { code: 'FGA - 199176', name: 'Desenho Industrial Assistido por Computador', semester: 1, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 0022'], status: 'concluida' },
    { code: 'FGA - 198005', name: 'Engenharia e Ambiente', semester: 1, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 198013', name: 'Introdução à Engenharia', semester: 1, row: 4, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 199133', name: 'Humanidades e Cidadania', semester: 1, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },

    // 2º Semestre
    { code: 'MAT - 113042', name: 'Cálculo 2', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['MAT - 113051', 'FGA - 195413', 'FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118001', name: 'Física 1', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118010', name: 'Física 1 Experimental', semester: 2, row: 2, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: [], status: 'concluida' },
    { code: 'MAT - 113093', name: 'Introdução à Álgebra Linear', semester: 2, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 195332', name: 'Probabilidade e Estatística Aplicada', semester: 2, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 193321'], status: 'concluida' },
    { code: 'QUI - 118028', name: 'Química Geral e Tecnológica', semester: 2, row: 5, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 0035'], status: 'concluida' },

    // 3º Semestre
    { code: 'MAT - 113051', name: 'Cálculo 3', semester: 3, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0043'], status: 'cursando' },
    { code: 'FGA - 0021', name: 'Mecânica dos Sólidos 1', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042', 'IFD - 118001'], dependents: ['FGA - 0023', 'FGA - 0042'], status: 'cursando' },
    { code: 'FGA - 195413', name: 'Métodos Numéricos para Engenharia', semester: 3, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042', 'CIC - 113476'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 193321', name: 'Engenharia Econômica', semester: 3, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 0035', name: 'Materiais de Construção Mecânica', semester: 3, row: 4, credits: 4, hours: 60, creditBlocks: [3, 1, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['QUI - 118028'], dependents: ['FGA - 0059'], status: 'cursando' },
    { code: 'FGA - 0022', name: 'Desenho Mecânico Automotivo e CAD', semester: 3, row: 5, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 199176'], dependents: ['FGA - 0069'], status: 'cursando' },

    // 4º Semestre
    { code: 'FGA - 0023', name: 'Dinâmica dos Mecanismos', semester: 4, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0021'], dependents: ['FGA - 0055'], status: 'elegivel' },
    { code: 'FGA - 0042', name: 'Resistência dos Materiais Automotivos', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0021'], dependents: ['FGA - 0069'], status: 'bloqueada' },
    { code: 'FGA - 0043', name: 'Fenômenos de Transporte', semester: 4, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0056', 'FGA - 0062'], status: 'bloqueada' },
    { code: 'FGA - 201626', name: 'Gestão da Produção e Qualidade', semester: 4, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195413', 'FGA - 193321'], dependents: ['FGA - 193861'], status: 'bloqueada' },
    { code: 'FGA - 193861', name: 'Projeto Integrador de Engenharia 1', semester: 4, row: 4, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 201626'], dependents: ['FGA - 208175'], status: 'bloqueada' },
    { code: 'FGA - 0045', name: 'Segurança do Trabalho e Ergonomia', semester: 4, row: 5, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'elegivel' },

    // 5º Semestre
    { code: 'FGA - 0055', name: 'Dinâmica Veicular 1 (Chassi & Suspensão)', semester: 5, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0023'], dependents: ['FGA - 0079'], status: 'bloqueada' },
    { code: 'FGA - 0056', name: 'Termodinâmica Aplicada a Motores', semester: 5, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0089'], status: 'bloqueada' },
    { code: 'FGA - 0057', name: 'Eletricidade e Eletrônica Aplicada', semester: 5, row: 2, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0085'], status: 'bloqueada' },
    { code: 'FGA - 0059', name: 'Processos de Fabricação Automotiva', semester: 5, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0035'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AUT01', name: 'Optativa 1', semester: 5, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 6º Semestre
    { code: 'FGA - 0069', name: 'Elementos de Máquinas Automotivos', semester: 6, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0042', 'FGA - 0022'], dependents: ['FGA - 0080'], status: 'bloqueada' },
    { code: 'FGA - 0062', name: 'Mecânica dos Fluidos e Transferência de Calor', semester: 6, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0089'], status: 'bloqueada' },
    { code: 'FGA - 0066', name: 'Sistemas de Controle Automotivo', semester: 6, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0085'], status: 'bloqueada' },
    { code: 'OPT - AUT02', name: 'Optativa 2', semester: 6, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AUT03', name: 'Optativa 3', semester: 6, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 7º Semestre
    { code: 'FGA - 0079', name: 'Dinâmica Longitudinal e Transversal (Veicular 2)', semester: 7, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0055'], dependents: ['FGA - 0093'], status: 'bloqueada' },
    { code: 'FGA - 0089', name: 'Motores de Combustão e Powertrain', semester: 7, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0056', 'FGA - 0062'], dependents: ['FGA - 0094'], status: 'bloqueada' },
    { code: 'FGA - 0080', name: 'Projeto Estrutural de Chassis e Carroceria', semester: 7, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0069'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AUT04', name: 'Optativa 4', semester: 7, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AUT05', name: 'Optativa 5', semester: 7, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 8º Semestre
    { code: 'FGA - 0085', name: 'Eletrônica e Redes Veiculares (CAN / LIN)', semester: 8, row: 0, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0057', 'FGA - 0066'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0093', name: 'Aerodinâmica Automotiva e Túnel de Vento', semester: 8, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0079'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 208175', name: 'Projeto Integrador de Engenharia 2', semester: 8, row: 2, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 193861'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AUT06', name: 'Optativa 6', semester: 8, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AUT07', name: 'Optativa 7', semester: 8, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 9º Semestre
    { code: 'FGA - 101141', name: 'Trabalho de Conclusão de Curso 1', semester: 9, row: 0, credits: 4, hours: 60, creditBlocks: [0, 4, 0, 8], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: ['FGA - 102415'], status: 'bloqueada' },
    { code: 'FGA - 0094', name: 'Propulsão Híbrida e Veículos Elétricos', semester: 9, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0089'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 102512', name: 'Estágio Supervisionado', semester: 9, row: 2, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AUT08', name: 'Optativa 8', semester: 9, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 10º Semestre
    { code: 'FGA - 102415', name: 'Trabalho de Conclusão de Curso 2', semester: 10, row: 0, credits: 6, hours: 90, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 101141'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0095', name: 'Segurança Veicular e Crashworthiness', semester: 10, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0080'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - AUT09', name: 'Optativa 9', semester: 10, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - AUT10', name: 'Optativa 10', semester: 10, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
  ],
};

/**
 * FLUXOGRAMA OFICIAL DE ENGENHARIA DE ENERGIA — Faculdade UnB Gama (FGA)
 * Baseado na matriz oficial da FGA/UnB (10 semestres, 242 créditos).
 */
export const ENERGIA_FLOWCHART: CourseFlowchart = {
  courseCode: 'FGA-ENERG',
  courseName: 'Engenharia de Energia',
  campus: 'Faculdade UnB Gama (FGA)',
  totalCredits: 242,
  semestersCount: 10,
  semesterCredits: [24, 24, 26, 26, 24, 24, 24, 24, 24, 20],
  subjects: [
    // 1º Semestre (Ciclo Básico FGA)
    { code: 'MAT - 113034', name: 'Cálculo 1', semester: 1, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332'], status: 'concluida' },
    { code: 'CIC - 113476', name: 'Algoritmos e Programação Científica', semester: 1, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 195413'], status: 'concluida' },
    { code: 'QUI - 118028', name: 'Química Geral e Experimental para Energia', semester: 1, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 0036'], status: 'concluida' },
    { code: 'FGA - 198005', name: 'Engenharia e Ambiente', semester: 1, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'MAT - 113093', name: 'Introdução à Álgebra Linear', semester: 1, row: 4, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },

    // 2º Semestre
    { code: 'MAT - 113042', name: 'Cálculo 2', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['MAT - 113051', 'FGA - 195413', 'FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118001', name: 'Física Clássica 1', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 0021'], status: 'concluida' },
    { code: 'IFD - 118010', name: 'Física Clássica Experimental', semester: 2, row: 2, credits: 2, hours: 30, creditBlocks: [0, 2, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: [], status: 'concluida' },
    { code: 'FGA - 199176', name: 'Desenho Industrial Assistido por Computador', semester: 2, row: 3, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 199133', name: 'Humanidades e Cidadania', semester: 2, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
    { code: 'FGA - 198013', name: 'Introdução às Engenharias', semester: 2, row: 5, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },

    // 3º Semestre
    { code: 'MAT - 113051', name: 'Cálculo 3', semester: 3, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0041', 'FGA - 0043'], status: 'cursando' },
    { code: 'FGA - 0021', name: 'Mecânica dos Sólidos 1', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113042', 'IFD - 118001'], dependents: [], status: 'cursando' },
    { code: 'FGA - 195413', name: 'Métodos Numéricos para Engenharia', semester: 3, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042', 'CIC - 113476'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 195332', name: 'Probabilidade e Estatística Aplicada', semester: 3, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 193321'], status: 'cursando' },
    { code: 'FGA - 193321', name: 'Engenharia Econômica', semester: 3, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 201626'], status: 'cursando' },
    { code: 'FGA - 0036', name: 'Fontes de Energia e Tecnologias de Conversão', semester: 3, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['QUI - 118028'], dependents: ['FGA - 0060'], status: 'cursando' },

    // 4º Semestre
    { code: 'FGA - 0041', name: 'Métodos Matemáticos para Engenharia', semester: 4, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: [], status: 'elegivel' },
    { code: 'FGA - 0043', name: 'Fenômenos de Transporte', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: ['FGA - 0056', 'FGA - 0062'], status: 'bloqueada' },
    { code: 'IFD - 118036', name: 'Física Moderna e Eletromagnetismo', semester: 4, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 0057'], status: 'elegivel' },
    { code: 'FGA - 0035', name: 'Materiais de Construção para Engenharia', semester: 4, row: 3, credits: 4, hours: 60, creditBlocks: [3, 1, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'FGA - 0045', name: 'Engenharia de Segurança do Trabalho', semester: 4, row: 4, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'FGA - 0060', name: 'Combustíveis e Biocombustíveis', semester: 4, row: 5, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0036'], dependents: [], status: 'bloqueada' },

    // 5º Semestre
    { code: 'FGA - 201626', name: 'Gestão da Produção e Qualidade', semester: 5, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195413', 'FGA - 193321'], dependents: ['FGA - 193861'], status: 'bloqueada' },
    { code: 'FGA - 0056', name: 'Termodinâmica Aplicada a Sistemas de Energia', semester: 5, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0070'], status: 'bloqueada' },
    { code: 'FGA - 0057', name: 'Eletricidade Aplicada (Circuitos e Redes)', semester: 5, row: 2, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['IFD - 118036'], dependents: ['FGA - 0087'], status: 'bloqueada' },
    { code: 'FGA - 193861', name: 'Projeto Integrador de Engenharia 1', semester: 5, row: 3, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 201626'], dependents: ['FGA - 208175'], status: 'bloqueada' },
    { code: 'OPT - ENE01', name: 'Optativa 1', semester: 5, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 6º Semestre
    { code: 'FGA - 0062', name: 'Mecânica dos Fluidos e Transferência de Calor', semester: 6, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0043'], dependents: ['FGA - 0070'], status: 'bloqueada' },
    { code: 'FGA - 0070', name: 'Centrais Termelétricas e Cogeração', semester: 6, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0056', 'FGA - 0062'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0087', name: 'Conversão Eletromecânica de Energia', semester: 6, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0057'], dependents: ['FGA - 0097'], status: 'bloqueada' },
    { code: 'FGA - 0066', name: 'Instrumentação e Controle de Sistemas', semester: 6, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MAT - 113051'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ENE02', name: 'Optativa 2', semester: 6, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 7º Semestre
    { code: 'FGA - 0096', name: 'Energia Solar Fotovoltaica e Térmica', semester: 7, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0056'], dependents: ['FGA - 0104'], status: 'bloqueada' },
    { code: 'FGA - 0097', name: 'Geração Eólica e Centrais Hidroelétricas', semester: 7, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0087'], dependents: ['FGA - 0104'], status: 'bloqueada' },
    { code: 'FGA - 0098', name: 'Eficiência Energética e Gestão de Energia', semester: 7, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0056'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ENE03', name: 'Optativa 3', semester: 7, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - ENE04', name: 'Optativa 4', semester: 7, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 8º Semestre
    { code: 'FGA - 0104', name: 'Transmissão e Distribuição de Energia Elétrica', semester: 8, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0096', 'FGA - 0097'], dependents: ['FGA - 0105'], status: 'bloqueada' },
    { code: 'FGA - 208175', name: 'Projeto Integrador de Engenharia 2', semester: 8, row: 1, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 193861'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ENE05', name: 'Optativa 5', semester: 8, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - ENE06', name: 'Optativa 6', semester: 8, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - ENE07', name: 'Optativa 7', semester: 8, row: 4, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 9º Semestre
    { code: 'FGA - 101141', name: 'Trabalho de Conclusão de Curso 1', semester: 9, row: 0, credits: 4, hours: 60, creditBlocks: [0, 4, 0, 8], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: ['FGA - 102415'], status: 'bloqueada' },
    { code: 'FGA - 0105', name: 'Redes Inteligentes (Smart Grids) e Armazenamento', semester: 9, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0104'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 102512', name: 'Estágio Supervisionado', semester: 9, row: 2, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 208175'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ENE08', name: 'Optativa 8', semester: 9, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

    // 10º Semestre
    { code: 'FGA - 102415', name: 'Trabalho de Conclusão de Curso 2', semester: 10, row: 0, credits: 6, hours: 90, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 101141'], dependents: [], status: 'bloqueada' },
    { code: 'FGA - 0106', name: 'Planejamento e Mercados de Energia', semester: 10, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 0104'], dependents: [], status: 'bloqueada' },
    { code: 'OPT - ENE09', name: 'Optativa 9', semester: 10, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    { code: 'OPT - ENE10', name: 'Optativa 10', semester: 10, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
  ],
};

/**
 * Retorna o fluxograma completo e oficial para cursos cadastrados,
 * ou gera um fluxograma representativo padronizado para outros cursos.
 */
export function getCourseFlowchart(courseCode: string, courseName: string, campus: string): CourseFlowchart {
  switch (courseCode) {
    case 'FGA-SW':
      return SOFTWARE_FLOWCHART;
    case 'FGA-AERO':
      return AERO_FLOWCHART;
    case 'FGA-ELET':
      return ELETRONICA_FLOWCHART;
    case 'FGA-AUTO':
      return AUTOMOTIVA_FLOWCHART;
    case 'FGA-ENERG':
      return ENERGIA_FLOWCHART;
    default:
      return generateGenericFlowchart(courseCode, courseName, campus);
  }
}export function generateGenericFlowchart(courseCode: string, courseName: string, campus: string): CourseFlowchart {
  if (courseCode === 'FGA-SW') return SOFTWARE_FLOWCHART;

  const isExatasOrEng =
    courseCode.startsWith('FGA') ||
    courseCode.startsWith('CIC') ||
    courseCode.startsWith('MAT') ||
    courseCode.startsWith('ENE') ||
    courseCode.startsWith('ENC') ||
    courseCode.startsWith('ENM') ||
    courseCode.startsWith('QUI');

  if (isExatasOrEng) {
    return {
      courseCode,
      courseName,
      campus,
      totalCredits: 232,
      semestersCount: 6,
      semesterCredits: [24, 24, 24, 24, 24, 22],
      subjects: [
        { code: 'MAT - 113034', name: 'Cálculo 1', semester: 1, row: 0, credits: 6, hours: 90, creditBlocks: [2, 4, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MAT - 113042', 'IFD - 118001', 'FGA - 195332'], status: 'concluida' },
        { code: 'MAT - 113042', name: 'Cálculo 2', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 195413'], status: 'cursando' },
        { code: 'FGA - 195413', name: 'Métodos Numéricos para Engenharia', semester: 3, row: 0, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113042'], dependents: ['FGA - 201626'], status: 'elegivel' },
        { code: 'FGA - 201626', name: 'Gestão da Produção e Qualidade', semester: 4, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195413', 'FGA - 193321'], dependents: ['PRO0010'], status: 'bloqueada' },
        { code: 'PRO0010', name: 'Projeto Integrador de Engenharia 1', semester: 5, row: 0, credits: 6, hours: 90, creditBlocks: [0, 4, 0, 6], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['FGA - 201626'], dependents: ['TCC0001'], status: 'bloqueada' },
        { code: 'TCC0001', name: 'Trabalho de Conclusão de Curso', semester: 6, row: 0, credits: 8, hours: 120, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['PRO0010'], dependents: [], status: 'bloqueada' },

        { code: 'CIC - 113476', name: 'Algoritmos e Programação de Computadores', semester: 1, row: 1, credits: 6, hours: 90, creditBlocks: [4, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['CIC0090'], status: 'concluida' },
        { code: 'IFD - 118001', name: 'Física 1', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 0], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: [], status: 'cursando' },
        { code: 'FGA - 193321', name: 'Engenharia Econômica', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['FGA - 195332'], dependents: ['FGA - 201626'], status: 'elegivel' },
        { code: 'CIC0090', name: 'Estruturas de Dados e Algoritmos', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['CIC - 113476'], dependents: ['ESP0010'], status: 'bloqueada' },
        { code: 'ESP0010', name: `Sistemas Aplicados em ${courseName.split(' ')[0]}`, semester: 5, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['CIC0090'], dependents: ['EST0199'], status: 'bloqueada' },
        { code: 'EST0199', name: 'Estágio Supervisionado', semester: 6, row: 1, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['ESP0010'], dependents: [], status: 'bloqueada' },

        { code: 'FGA - 198005', name: 'Engenharia e Ambiente', semester: 1, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
        { code: 'MAT - 113093', name: 'Introdução à Álgebra Linear', semester: 2, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['FGA - 119482'], status: 'concluida' },
        { code: 'FGA - 119482', name: 'Teoria de Eletrônica Digital 1', semester: 3, row: 2, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113093'], dependents: ['FGA - 193674'], status: 'elegivel' },
        { code: 'FGA - 193674', name: 'Arquitetura e Sistemas Digitais', semester: 4, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FGA - 119482'], dependents: [], status: 'bloqueada' },
        { code: 'OPT - 01', name: 'Optativa', semester: 5, row: 2, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },

        { code: 'FGA - 198013', name: 'Introdução à Engenharia', semester: 1, row: 3, credits: 2, hours: 30, creditBlocks: [2, 0, 0, 2], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: [], status: 'concluida' },
        { code: 'FGA - 195332', name: 'Probabilidade e Estatística Aplicada', semester: 2, row: 3, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 6], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['MAT - 113034'], dependents: ['FGA - 193321'], status: 'concluida' },
      ],
    };
  }

  return {
    courseCode,
    courseName,
    campus,
    totalCredits: 210,
    semestersCount: 6,
    semesterCredits: [20, 22, 24, 24, 24, 20],
    subjects: [
      { code: 'FND - 0010', name: `Fundamentos em ${courseName}`, semester: 1, row: 0, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['MET - 0020', 'CLI - 0010'], status: 'concluida' },
      { code: 'MET - 0020', name: 'Técnicas e Métodos de Intervenção 1', semester: 2, row: 0, credits: 6, hours: 90, creditBlocks: [2, 4, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FND - 0010'], dependents: ['CLI - 0020'], status: 'cursando' },
      { code: 'CLI - 0020', name: 'Técnicas e Métodos de Intervenção 2', semester: 3, row: 0, credits: 6, hours: 90, creditBlocks: [2, 4, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['MET - 0020'], dependents: ['PRA - 0030'], status: 'elegivel' },
      { code: 'PRA - 0030', name: 'Prática Avançada Supervisionada', semester: 4, row: 0, credits: 6, hours: 90, creditBlocks: [0, 6, 0, 6], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['CLI - 0020'], dependents: ['ESTAG - 01'], status: 'bloqueada' },
      { code: 'ESTAG - 01', name: 'Estágio Supervisionado', semester: 5, row: 0, credits: 14, hours: 210, creditBlocks: [0, 0, 14, 14], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['PRA - 0030'], dependents: ['TCC - 0001'], status: 'bloqueada' },
      { code: 'TCC - 0001', name: 'Trabalho de Conclusão de Curso', semester: 6, row: 0, credits: 8, hours: 120, creditBlocks: [0, 6, 0, 12], boxCategory: 'laranja', category: 'Obrigatória', prereqs: ['ESTAG - 01'], dependents: [], status: 'bloqueada' },

      { code: 'BIO - 0020', name: 'Metodologia Científica e Pesquisa', semester: 1, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: [], dependents: ['EST - 0011'], status: 'concluida' },
      { code: 'EST - 0011', name: 'Estatística Aplicada', semester: 2, row: 1, credits: 4, hours: 60, creditBlocks: [4, 0, 0, 4], boxCategory: 'amarelo', category: 'Obrigatória', prereqs: ['BIO - 0020'], dependents: ['CLI - 0010'], status: 'cursando' },
      { code: 'CLI - 0010', name: 'Diagnóstico e Planejamento', semester: 3, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'verde', category: 'Obrigatória', prereqs: ['FND - 0010', 'EST - 0011'], dependents: [], status: 'elegivel' },
      { code: 'OPT - 01', name: 'Optativa', semester: 4, row: 1, credits: 4, hours: 60, creditBlocks: [2, 2, 0, 4], boxCategory: 'rosa', category: 'Optativa', prereqs: [], dependents: [], status: 'elegivel' },
    ],
  };
}
