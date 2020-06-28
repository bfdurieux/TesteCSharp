using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;

namespace TesteCSharp
{
    public class Program
    {
        static void Main(string[] args)
        {
            WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build().Run();
        }
    }
}
