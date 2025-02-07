import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
export class ReservationController {
  private readonly logger = new Logger(ReservationController.name);

  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: ReservationDto) {
    try {
      const result = await this.reservationService.create(reservationDto);
      return  result.clientSecret ;
    } catch (error) {
      this.logger.error("Erreur lors de la création de la réservation", error);

      // Si l'erreur est déjà une HttpException, la relancer directement
      if (error instanceof HttpException) {
        throw error;
      }

      // Gestion des erreurs spécifiques
      if (error.message.includes("Validation")) {
        throw new BadRequestException("Données invalides.");
      }

      if (error.message.includes("not found")) {
        throw new NotFoundException("Réservation non trouvée.");
      }

      if (error.message.includes("Conflict")) {
        throw new HttpException(
          "Conflit : réservation déjà existante.",
          HttpStatus.CONFLICT
        );
      }

      // Pour toute autre erreur, retourner une erreur 500
      throw new InternalServerErrorException("Erreur interne du serveur.");
    }
  }
}
