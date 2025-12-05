# Serviço de Criação de Usuários - UserCreationService

## Visão Geral

O `UserCreationService` encapsula a lógica de criação de diferentes tipos de usuários:
- **user**: Usuário básico na tabela `users`
- **leitor**: Leitor com User associado (tabelas `users` + `leitors`)
- **administrador**: Administrador na tabela `administradores`
- **bibliotecario**: Bibliotecário na tabela `bibliotecarios`

## Fluxo de Arquitetura

```
Client (HTTP Request)
    ↓
Router (/users ou /users/create-typed)
    ↓
UsersController (store | createTyped)
    ↓
UserCreationService.createUser(type, payload)
    ↓
Models (User, Leitor, Administradore, Bibliotecario)
    ↓
Database (SQLite)
```

## Endpoints da API

### 1. Criar Usuário Básico
```http
POST /users
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "CPF": "12345678901",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua A, 123",
  "data_de_cadastro": "2025-12-05"
}

Response 201:
{
  "type": "user",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "CPF": "12345678901",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua A, 123",
    "data_de_cadastro": "2025-12-05",
    "createdAt": "2025-12-05T10:30:00Z",
    "updatedAt": "2025-12-05T10:30:00Z"
  }
}
```

### 2. Criar Leitor com User
```http
POST /users/create-typed
Content-Type: application/json

{
  "type": "leitor",
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "CPF": "98765432101",
  "telefone": "(11) 88888-8888",
  "endereco": "Rua B, 456",
  "data_de_cadastro": "2025-12-05",
  "matricula": "2025001",
  "password": "senha123"
}

Response 201:
{
  "type": "leitor",
  "user": {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@example.com",
    ...
  },
  "leitor": {
    "id": 1,
    "userId": 2,
    "matricula": "2025001",
    "createdAt": "2025-12-05T10:30:00Z",
    "updatedAt": "2025-12-05T10:30:00Z"
  }
}
```

### 3. Criar Administrador
```http
POST /users/create-typed
Content-Type: application/json

{
  "type": "administrador",
  "nome": "Admin User",
  "email": "admin@example.com",
  "CPF": "11111111111",
  "telefone": "(11) 77777-7777",
  "endereco": "Rua Admin, 789",
  "data_de_cadastro": "2025-12-05"
}

Response 201:
{
  "type": "administrador",
  "administrador": {
    "id": 1,
    "nome": "Admin User",
    "email": "admin@example.com",
    ...
  }
}
```

### 4. Criar Bibliotecário
```http
POST /users/create-typed
Content-Type: application/json

{
  "type": "bibliotecario",
  "nome": "Bibliotecário Silva",
  "email": "bib@example.com",
  "CPF": "22222222222",
  "telefone": "(11) 66666-6666",
  "endereco": "Rua Biblioteca, 321",
  "data_de_cadastro": "2025-12-05"
}

Response 201:
{
  "type": "bibliotecario",
  "bibliotecario": {
    "id": 1,
    "nome": "Bibliotecário Silva",
    ...
  }
}
```

## Modelos de Dados

### User (Base)
Tabela: `users`
```typescript
- id: number (PK)
- nome: string
- email: string (UNIQUE)
- password: string (hashed)
- CPF: string (UNIQUE)
- telefone: string
- endereco: string
- data_de_cadastro: date
- createdAt: timestamp
- updatedAt: timestamp
```

### Leitor
Tabela: `leitors`
```typescript
- id: number (PK)
- user_id: number (FK → users.id, CASCADE)
- matricula: string (UNIQUE)
- createdAt: timestamp
- updatedAt: timestamp
- Relação: belongsTo(User)
```

### Administradore
Tabela: `administradores`
```typescript
- id: number (PK)
- nome: string
- email: string
- CPF: string
- telefone: string
- endereco: string
- data_de_cadastro: date
- createdAt: timestamp
- updatedAt: timestamp
```

### Bibliotecario
Tabela: `bibliotecarios`
```typescript
- id: number (PK)
- nome: string
- email: string
- CPF: string
- telefone: string
- endereco: string
- data_de_cadastro: date
- createdAt: timestamp
- updatedAt: timestamp
```

## Implementação

### Service (app/services/user_creation_service.ts)
```typescript
export type UserType = 'user' | 'leitor' | 'administrador' | 'bibliotecario'

export default class UserCreationService {
  async createUser(type: UserType, payload: CreateUserPayload | CreateLeitorPayload)
  private async createBasicUser(payload: CreateUserPayload)
  private async createLeitor(payload: CreateLeitorPayload)
  private async createAdministrador(payload: CreateUserPayload)
  private async createBibliotecario(payload: CreateUserPayload)
}
```

### Controller (app/controllers/users_controller.ts)
```typescript
export default class UsersController {
  // Criar usuário básico
  async store({ request }: HttpContext)
  
  // Criar usuário com tipo específico
  async createTyped({ request }: HttpContext)
  
  // Listar todos
  async index()
  
  // Buscar um
  async show({ params })
  
  // Atualizar
  async update({ params, request })
  
  // Deletar
  async destroy({ params })
}
```

### Rotas (start/routes.ts)
```typescript
router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.post('/', [UsersController, 'store'])
  router.post('/create-typed', [UsersController, 'createTyped'])
  router.get('/:id', [UsersController, 'show'])
  router.patch('/:id', [UsersController, 'update'])
  router.delete('/:id', [UsersController, 'destroy'])
}).prefix('/users').apiOnly()
```

## Validação (app/validators/user.ts)

- `nome`: string, mínimo 6 caracteres (obrigatório)
- `email`: email válido (obrigatório)
- `CPF`: string (obrigatório)
- `telefone`: string (obrigatório)
- `endereco`: string (obrigatório)
- `data_de_cadastro`: date (obrigatório)
- `password`: string, mínimo 6 caracteres (opcional)
- `type`: enum ['user', 'leitor', 'administrador', 'bibliotecario'] (opcional, padrão: 'user')
- `matricula`: string (obrigatório para tipo 'leitor')

## Tratamento de Erros

```json
{
  "error": "matricula é obrigatória para usuários do tipo leitor",
  "code": "MISSING_MATRICULA"
}
```

## Referências

- AdonisJS: https://docs.adonisjs.com/
- Lucid ORM: https://lucid.adonisjs.com/docs
- VineJS: https://vinejs.dev/

