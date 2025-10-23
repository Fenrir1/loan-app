import { ProductCategory, ApiResponse } from "../types";

const BASE_URL = "https://dummyjson.com";

export class ApiService {
  static async getProductCategories(): Promise<ProductCategory[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories: ProductCategory[] = await response.json();

      return categories;
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
      throw new Error("Не удалось загрузить список категорий");
    }
  }

  static async submitLoanApplication(title: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        message: "Заявка успешно отправлена",
        data: data,
      };
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error);
      return {
        success: false,
        message: "Ошибка при отправке заявки",
      };
    }
  }
}
