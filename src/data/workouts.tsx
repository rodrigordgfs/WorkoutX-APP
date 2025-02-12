export interface Exercise {
    id: string;
    name: string;
    series: number;
    repetitions: string;
    weight?: string;
    restTime: number;
    videoUrl: string;
    instructions: string;
}

export interface WorkoutDay {
    id: string;
    name: string;
    exercises: Exercise[];
}

export type WorkoutDays = WorkoutDay[];

export const workoutDays: WorkoutDays = [
    {
        "id": "ace4530e-b231-4c0b-80e5-bf37fb38ddb6",
        "name": "Treino A - Peito e Bíceps",
        "exercises": [
            {
                "id": "d291bd4b-9a6a-4426-a23e-8e238cac89ea",
                "name": "Supino Reto",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=EZMYCLKuGow",
                "instructions": "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento."
            },
            {
                "id": "243c0d9a-93f6-40a8-b254-2124344eb097",
                "name": "Supino Inclinado",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=WP1VLAt8hbM",
                "instructions": "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços."
            },
            {
                "id": "51584be9-e974-483a-88cb-81be89b58daa",
                "name": "Pullover",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=-KaMXMMIVrU",
                "instructions": "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados."
            },
            {
                "id": "10ee7cd0-99d7-425c-b983-dee8749c6f79",
                "name": "Crossover",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
                "instructions": "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial."
            },
            {
                "id": "84e206fa-4e13-432f-8137-af733cc6bd4f",
                "name": "Rosca Direta com Barra",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=s4B8UW3BMqk",
                "instructions": "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial."
            },
            {
                "id": "c85a727e-815f-47ad-a206-9e1202d35cc1",
                "name": "Rosca Alternada com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=S1HAcTVQVYE",
                "instructions": "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial."
            },
            {
                "id": "7179a28d-bd79-4fae-992b-0d8ea6c3ca46",
                "name": "Rosca Scott com Barra W",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=Kh4G5N48EO8",
                "instructions": "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada."
            },
            {
                "id": "f6d93970-671b-4712-be0a-49c794ff8196",
                "name": "Rosca Concentrada com Halter",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=PcwdHVhWY3s",
                "instructions": "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial."
            }
        ]
    },
    {
        "id": "8d19e861-6e97-4260-bc0c-556a04ea96a3",
        "name": "Treino B - Costas e Tríceps",
        "exercises": [
            {
                "id": "0e8c18e9-0037-44f7-80d1-14db3810b300",
                "name": "Levantamento Terra",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "40",
                "restTime": 90,
                "videoUrl": "https://www.youtube.com/watch?v=50AkPBZwACQ",
                "instructions": "Mantenha os pés na largura dos ombros, segure a barra com pegada firme e levante-a estendendo os quadris e joelhos. Mantenha a coluna neutra e retorne à posição inicial de forma controlada."
            },
            {
                "id": "54fe6ea2-487a-4f48-aa42-21c2f518604b",
                "name": "Puxada Alta",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "30",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=9FFLBDWXSZA",
                "instructions": "Segure a barra com as mãos na largura dos ombros e puxe-a até abaixo do queixo. Mantenha os cotovelos elevados e controle o movimento na descida."
            },
            {
                "id": "58f24ef1-a0a6-44cc-b261-74c76441766e",
                "name": "Remada Curvado",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "25",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=TfxJMertfsw",
                "instructions": "Incline o tronco para frente segurando a barra com pegada pronada. Puxe a barra em direção ao abdômen, contraindo as escápulas, e retorne de forma controlada."
            },
            {
                "id": "480d12e0-c284-4b33-a872-15cfd9c8a412",
                "name": "Serrote",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=m4h4jT9patY",
                "instructions": "Apoie um joelho e uma mão no banco, segurando o halter com a outra mão. Puxe o halter em direção ao abdômen e retorne lentamente à posição inicial."
            },
            {
                "id": "e77e6ea8-4750-4b82-b3cf-4b29ff759069",
                "name": "Tríceps Testa com Barra",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=J2g1cJ2lNOg",
                "instructions": "Deitado no banco reto, segure a barra com pegada fechada e leve-a até a testa flexionando os cotovelos. Estenda os braços para retornar à posição inicial."
            },
            {
                "id": "8cc1fbfa-da3e-495d-87e0-d07efbee0dcb",
                "name": "Tríceps na Polia com Barra",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "25",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=9cmeOVHOjck",
                "instructions": "Segure a barra na polia alta com pegada pronada e empurre-a para baixo até a extensão total dos braços. Retorne controladamente à posição inicial."
            },
            {
                "id": "094a12e6-f10a-423a-9aba-07732cd58c37",
                "name": "Tríceps Corda na Polia",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=TLnIVtuuoYw",
                "instructions": "Segure a corda na polia alta com pegada neutra e empurre-a para baixo, separando as pontas no final do movimento. Retorne lentamente à posição inicial."
            },
            {
                "id": "b206d82f-5c29-4065-b02a-be8e509a61e5",
                "name": "Extensão de Tríceps com Halteres Unilateral",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "12",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=zPAfW4JyUTI",
                "instructions": "Segure um halter acima da cabeça com uma das mãos e flexione o cotovelo para trás. Retorne à posição inicial estendendo completamente o braço."
            }
        ]
    },
    {
        "id": "d87d4a9d-d73c-413b-8aec-1cdc1c92ecfd",
        "name": "Treino C - Deltoides, Quadríceps e Posterior de Coxa",
        "exercises": [
            {
                "id": "ac29c299-cec7-48de-9deb-9f1afce66f2d",
                "name": "Desenvolvimento de Ombros na Máquina",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=uKw0TCpC8-o",
                "instructions": "Sente-se na máquina, ajuste a altura do banco e segure as alavancas na altura dos ombros. Empurre o peso para cima até estender os braços e retorne de forma controlada."
            },
            {
                "id": "66a1e110-fe62-438b-b7fc-8b36797ed47a",
                "name": "Desenvolvimento com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=eufDL9MmF8A",
                "instructions": "Segure um halter em cada mão na altura dos ombros. Pressione os pesos para cima até estender completamente os braços e retorne lentamente."
            },
            {
                "id": "11f246a7-35f5-4934-b6b3-3b12efd96659",
                "name": "Elevação Frontal com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 45,
                "videoUrl": "https://www.youtube.com/watch?v=NxSuojHZa8k",
                "instructions": "Segure um halter em cada mão e levante-os à frente do corpo até a altura dos ombros, mantendo os braços estendidos. Retorne controladamente."
            },
            {
                "id": "081880e2-5ac4-4b5b-b57f-d1fb2452e0e8",
                "name": "Elevação Lateral com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 45,
                "videoUrl": "https://www.youtube.com/watch?v=IwWvZ0rlNXs",
                "instructions": "Segure um halter em cada mão ao lado do corpo. Levante os braços lateralmente até a altura dos ombros e desça lentamente."
            },
            {
                "id": "464b5ea5-2eb5-4e51-8085-79795a454788",
                "name": "Crucifixo Invertido Usando o Voador",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=wjlX-5DTjBQ",
                "instructions": "Sente-se no voador de costas para o apoio. Segure as alças e abra os braços para trás, contraindo os deltoides posteriores, e retorne controladamente."
            },
            {
                "id": "607389d0-a23c-4e24-9632-be7e5ad0e0ee",
                "name": "Agachamento Livre",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "40",
                "restTime": 90,
                "videoUrl": "https://www.youtube.com/watch?v=rM6SDUdl9fs",
                "instructions": "Mantenha os pés afastados na largura dos ombros e segure a barra sobre as costas. Agache-se até os joelhos formarem um ângulo de 90° e volte à posição inicial."
            },
            {
                "id": "879b8197-9d69-4fb0-a3e5-c6280c85d664",
                "name": "Leg Press",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "80",
                "restTime": 90,
                "videoUrl": "https://www.youtube.com/watch?v=nY8UsiAqwds",
                "instructions": "Posicione os pés na plataforma da máquina de leg press e empurre o peso para cima estendendo as pernas. Retorne controladamente até um ângulo de 90°."
            },
            {
                "id": "8106b84b-23d5-4438-9c4a-d9747b11f0e3",
                "name": "Avanço com Halteres",
                "series": 3,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=koeV-24SQOo",
                "instructions": "Segure um halter em cada mão e dê um passo à frente, flexionando o joelho até formar um ângulo de 90°. Retorne à posição inicial e alterne as pernas."
            },
            {
                "id": "a3fea39e-d075-40a5-8f70-91c4f3904531",
                "name": "Máquina Flexora",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "25",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=5yaWMXbkCGs",
                "instructions": "Sente-se na máquina flexora e ajuste o apoio para os tornozelos. Flexione os joelhos contra a resistência e retorne lentamente."
            },
            {
                "id": "ea2e3791-19e0-4226-949d-aaa0af786df0",
                "name": "Stiff com Barra",
                "series": 2,
                "repetitions": "8 - 12",
                "weight": "30",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=u1E3_u2gJYE",
                "instructions": "Segure a barra com pegada pronada e desça o tronco mantendo as costas retas. Retorne à posição inicial contraindo os glúteos e posteriores da coxa."
            }
        ]
    },
    {
        "id": "3bb0fe14-a887-4dea-a615-ac4f01252593",
        "name": "Treino D - Peito e Bíceps",
        "exercises": [
            {
                "id": "96102722-93b7-416a-b880-78046458f87e",
                "name": "Supino Reto",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=EZMYCLKuGow",
                "instructions": "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento."
            },
            {
                "id": "bbfeb0ca-cd81-432f-8b9f-847add33142a",
                "name": "Supino Inclinado",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=WP1VLAt8hbM",
                "instructions": "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços."
            },
            {
                "id": "6e1014a7-e4b9-442c-aff8-27e27d94dc18",
                "name": "Pullover",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=-KaMXMMIVrU",
                "instructions": "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados."
            },
            {
                "id": "03c37a6f-bc13-4226-ab0f-d61c23d779f3",
                "name": "Crossover",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
                "instructions": "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial."
            },
            {
                "id": "cb44a60a-8212-467e-b6b8-393bf1833e88",
                "name": "Rosca Direta com Barra",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "15",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=s4B8UW3BMqk",
                "instructions": "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial."
            },
            {
                "id": "5b969074-1242-4e6b-bba6-431bd9b5de4c",
                "name": "Rosca Alternada com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=S1HAcTVQVYE",
                "instructions": "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial."
            },
            {
                "id": "0f3a5fcc-cb92-40c1-9807-9a3097eab9db",
                "name": "Rosca Scott com Barra W",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=Kh4G5N48EO8",
                "instructions": "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada."
            },
            {
                "id": "bb031328-a6c1-4f3e-bf0b-89547034493c",
                "name": "Rosca Concentrada com Halter",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "10",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=PcwdHVhWY3s",
                "instructions": "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial."
            }
        ]
    },
    {
        "id": "6309a690-db1f-4650-92d6-4c488508c6b1",
        "name": "Treino E - Costas, Tríceps e Abdômen",
        "exercises": [
            {
                "id": "e4ae3e85-94b3-46e3-8f48-b97f651cd6a2",
                "name": "Barra Fixa",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "Corporal",
                "restTime": 90,
                "videoUrl": "https://www.youtube.com/watch?v=thg6cGXSlvY",
                "instructions": "Segure a barra com pegada pronada e as mãos afastadas na largura dos ombros. Puxe o corpo para cima até o queixo ultrapassar a barra e retorne lentamente."
            },
            {
                "id": "a5910ac8-58a8-473b-a0c1-9928702ccfbc",
                "name": "Remada Baixa na Polia",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "40",
                "restTime": 90,
                "videoUrl": "https://www.youtube.com/watch?v=f8AVh4VBbos",
                "instructions": "Sente-se na máquina, segure a barra ou alça com as mãos afastadas e puxe em direção ao tronco, mantendo a coluna reta. Retorne lentamente à posição inicial."
            },
            {
                "id": "4c37bb24-10f2-4544-9827-752c45099b96",
                "name": "Remada Unilateral com Halter",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "20",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=m4h4jT9patY",
                "instructions": "Apoie um joelho e a mão no banco, segure um halter com a outra mão e puxe em direção ao tronco. Retorne lentamente e repita com o outro braço."
            },
            {
                "id": "ab1475d6-191e-45d4-9a44-765ac383e9af",
                "name": "Encolhimento de Ombros com Halteres",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "25",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=YeILDnoeYEk",
                "instructions": "Segure um halter em cada mão ao lado do corpo e eleve os ombros o máximo possível. Segure por um instante e retorne lentamente."
            },
            {
                "id": "7a101563-214a-4f74-aad1-bcbc7e84d9c2",
                "name": "Tríceps Mergulho no Banco",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "Corporal",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=LdfpvZPnUSI",
                "instructions": "Apoie as mãos em um banco atrás do corpo e os pés em outro banco ou no chão. Flexione os cotovelos até formar um ângulo de 90° e suba lentamente."
            },
            {
                "id": "26de05e5-401c-4a18-b8de-094243d0e63d",
                "name": "Tríceps Francês com Halter",
                "series": 4,
                "repetitions": "8 - 12",
                "weight": "12",
                "restTime": 60,
                "videoUrl": "https://www.youtube.com/watch?v=GKpHcN1xM3o",
                "instructions": "Segure um halter com ambas as mãos acima da cabeça, flexione os cotovelos até que o peso fique atrás da cabeça e retorne à posição inicial."
            },
            {
                "id": "cd088d33-d433-4908-b378-9a8d3bef1b3e",
                "name": "Abdominal Infra na Paralela",
                "series": 4,
                "repetitions": "15",
                "weight": "Corporal",
                "restTime": 45,
                "videoUrl": "https://www.youtube.com/watch?v=xPV1lIF75FI",
                "instructions": "Apoie os cotovelos na paralela e eleve os joelhos em direção ao peito. Retorne lentamente sem balançar o corpo."
            },
            {
                "id": "312a033c-5eb0-44fc-a9a1-fad83244c2a4",
                "name": "Prancha Isométrica",
                "series": 4,
                "repetitions": "30 - 60 segundos",
                "weight": "Corporal",
                "restTime": 30,
                "videoUrl": "https://www.youtube.com/watch?v=3qTz7853Yiw",
                "instructions": "Apoie os antebraços no chão e mantenha o corpo reto, contraindo o abdômen. Segure a posição pelo tempo determinado."
            }
        ]
    }
    
];