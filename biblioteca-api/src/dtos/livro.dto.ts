import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsISBN } from "class-validator";

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  autor!: string;

  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsOptional()
  @IsInt()
  anoPublicacao?: number;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}

export class UpdateLivroDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsInt()
  anoPublicacao?: number;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}
