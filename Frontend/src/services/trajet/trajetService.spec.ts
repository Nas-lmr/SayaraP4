import { searchTrajet } from "./trajetService";

global.fetch = jest.fn();

describe("searchTrajet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait retourner des données si la requête est réussie", async () => {
    const mockData = { success: true, data: [{ id: 1, name: "trajet1" }] };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const params = {
      departureCity: "Paris",
      arrivalCity: "Lyon",
      travelDate: "2025-02-06",
    };

    const result = await searchTrajet(params);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3310/trip/filtre?dCity=Paris&aCity=Lyon&dDate=2025-02-06",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(result).toEqual(mockData);
  });

  it("devrait lancer une erreur si la requête échoue", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const params = {
      departureCity: "Paris",
      arrivalCity: "Lyon",
      travelDate: "2025-02-06",
    };

    await expect(searchTrajet(params)).rejects.toThrow(
      "Erreur HTTP : 500 Internal Server Error"
    );
  });

  it("devrait gérer les erreurs lors de la requête", async () => {
    const errorMessage = "Network Error";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage)); // Simuler une erreur réseau

    const params = {
      departureCity: "Paris",
      arrivalCity: "Lyon",
      travelDate: "2025-02-06",
    };

    // Vérifier que la fonction lance une erreur
    await expect(searchTrajet(params)).rejects.toThrow(
      `Erreur lors de la recherche: ${errorMessage}`
    );
  });
});
