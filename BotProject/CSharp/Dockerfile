FROM mcr.microsoft.com/dotnet/core/sdk:2.1-alpine AS build

WORKDIR /src/botproject/csharp

COPY *.sln .
COPY *.csproj .
COPY Tests/*.csproj Tests/
COPY NuGet.Config .

# run restore to create a distinct layer
RUN dotnet restore

COPY . .
RUN dotnet publish -o out

FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS runtime
WORKDIR /app/botproject/csharp
RUN dotnet tool install --global PowerShell
RUN wget -q https://packages.microsoft.com/config/ubuntu/19.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN apt-get update && apt-get install -y apt-transport-https
RUN AZ_REPO=stretch; echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | tee /etc/apt/sources.list.d/azure-cli.list
RUN dpkg -i packages-microsoft-prod.deb
RUN apt-get update && apt-get install -y dotnet-sdk-3.0
RUN apt-get install -y azure-cli
COPY --from=build /src/botproject/csharp/ComposerDialogs ./ComposerDialogs
COPY --from=build /src/botproject/csharp/out .
CMD ["dotnet", "BotProject.dll"]
