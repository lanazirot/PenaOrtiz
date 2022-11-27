BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Estudiantes] (
    [id_estudiante] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [direccion] VARCHAR(255) NOT NULL,
    [peso] DECIMAL(18,0) NOT NULL,
    [cinta] VARCHAR(20) NOT NULL,
    [id_gimnasio] INT,
    CONSTRAINT [PK__Estudian__E0B2763CBC7C25DA] PRIMARY KEY CLUSTERED ([id_estudiante])
);

-- CreateTable
CREATE TABLE [dbo].[Gimnasios] (
    [id_gimnasio] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [direccion] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK__Gimnasio__94E00E85F4FE6798] PRIMARY KEY CLUSTERED ([id_gimnasio])
);

-- AddForeignKey
ALTER TABLE [dbo].[Estudiantes] ADD CONSTRAINT [FK__Estudiant__id_gi__267ABA7A] FOREIGN KEY ([id_gimnasio]) REFERENCES [dbo].[Gimnasios]([id_gimnasio]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

