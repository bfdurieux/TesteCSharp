﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TesteCSharp;

namespace TesteCSharp.Migrations
{
    [DbContext(typeof(TCSContext))]
    [Migration("20200628163353_ModifiedFornecedor")]
    partial class ModifiedFornecedor
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TesteCSharp.Models.Empresa", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CNPJ")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomeFantasia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UF")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("TesteCSharp.Models.Fornecedor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpresaID")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumeroRegistro")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RG")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimestampCadastro")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("EmpresaID");

                    b.ToTable("Fornecedores");
                });

            modelBuilder.Entity("TesteCSharp.Models.Telefone", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Fornecedor")
                        .HasColumnType("int");

                    b.Property<int?>("FornecedorID")
                        .HasColumnType("int");

                    b.Property<string>("NumeroTelefone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("FornecedorID");

                    b.ToTable("Telefones");
                });

            modelBuilder.Entity("TesteCSharp.Models.Fornecedor", b =>
                {
                    b.HasOne("TesteCSharp.Models.Empresa", "Empresa")
                        .WithMany()
                        .HasForeignKey("EmpresaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TesteCSharp.Models.Telefone", b =>
                {
                    b.HasOne("TesteCSharp.Models.Fornecedor", null)
                        .WithMany("Telefone")
                        .HasForeignKey("FornecedorID");
                });
#pragma warning restore 612, 618
        }
    }
}
