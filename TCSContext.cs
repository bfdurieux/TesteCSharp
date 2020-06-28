using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TesteCSharp.Models;

namespace TesteCSharp
{
    public class TCSContext : DbContext
    {
        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Telefone> Telefones { get; set; }
        public TCSContext() { }

        public TCSContext(DbContextOptions options) : base(options) { }

            protected override void OnConfiguring(DbContextOptionsBuilder options)
                        => options.UseSqlServer("Data Source=DESKTOP-G42VCB5\\SQLEXPRESS;Integrated Security=true;Initial Catalog=TCSDB");
    }
}
