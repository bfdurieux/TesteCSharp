using System;
using System.Collections.Generic;
using System.Text;

namespace TesteCSharp.Models
{
    public class Fornecedor
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public Empresa? Empresa { get; set; }
        public int EmpresaID { get; set; }
        public string NumeroRegistro { get; set; }
        public string? RG { get; set; }
        public DateTime? DataNascimento { get; set; }
        public DateTime TimestampCadastro { get; set; }
        public List<Telefone>? Telefone { get; } = new List<Telefone>();
    }
}
