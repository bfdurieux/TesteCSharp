import { Empresa } from './empresa';
import { Telefone } from './telefone';

export interface Fornecedor {
  id?: number;
  nome: string;
  empresa?: Empresa;
  empresaId: number;
  numeroRegistro: string;
  rg?: string;
  dataNascimento?: string;
  timestampCadastro: string;
  telefone: Telefone[];
}
