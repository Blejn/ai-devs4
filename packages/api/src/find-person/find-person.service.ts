import Anthropic from "@anthropic-ai/sdk";
import { aiClient } from "../common/ai-client";
import { tools } from "./tools";
import { executeFunction } from "./agent-actions";

const messages: Anthropic.MessageParam[] = [
  {
    role: "user",
    content: `Masz do dyspozycji narzędzia. Wykonaj po kolei:
  1. Pobierz lokalizacje wszystkich podejrzanych osób (readLocationOfPeople)
  2. Dla każdej osoby sprawdź która elektrownia jest najbliżej (findClosestPersonToPlant)
  3. Wybierz osobę która była NAJBLIŻEJ którejkolwiek elektrowni
  4. Pobierz jej rok urodzenia (readBirthYearForPerson)
  5. Pobierz jej poziom dostępu (getAccessLevel)
  6. Wyślij odpowiedź (submitAnswer) z: name, surname, accessLevel, powerPlant (kod elektrowni)`,
  },
];

const MODEL = "claude-sonnet-4-5";
const MAX_ITERATIONS = 10;

for (let i = 0; i < MAX_ITERATIONS; i++) {
  const response = await aiClient.messages.create({
    model: MODEL,
    max_tokens: 10000,
    messages: messages,
    tools: tools,
  });
  messages.push({ role: "assistant", content: response.content });
  if (response.stop_reason !== "tool_use") {
    break;
  }
  for (const block of response.content) {
    if (block.type == "tool_use") {
      const result = await executeFunction(block.name, block.input);
      messages.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify(result),
          },
        ],
      });
    }
  }
}
