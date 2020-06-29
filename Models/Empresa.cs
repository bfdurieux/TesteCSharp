using System;
using System.Collections.Generic;
using System.Text;

namespace TesteCSharp.Models
{
    public class Empresa
    {
        public int ID { get; set; }
        public string NomeFantasia { get; set; }
        public string UF { get; set; }
        public string CNPJ { get; set; }
    }

    public class EmpresaFacade
    {
        public string CadastroIsValid(Empresa empresa)
        {
            if (empresa.UF.Length == 2 && empresa.CNPJ.Replace(@"/\D+/","").Length == 14)
            {
                return "Cadastro Valido";
            }
            throw new Exception("Cadastro Invalido");
        }
    }
}
