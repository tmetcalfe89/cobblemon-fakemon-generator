import { useCallback, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Center,
  NumberInput,
  Select,
  Stack,
  Title,
  Group,
} from "@mantine/core";
import { MainFormContext } from "../context/MainForm";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import SelectItem from "../components/SelectItem";

export default function Moves() {
  const {
    values,
    insertListItem,
    removeListItem,
    setFieldValue,
    moves,
    moveLearnTypes,
  } = useContext(MainFormContext);

  const handleAdd = useCallback(() => {
    insertListItem("moves", {
      type: "level",
      level: 50,
      name: "",
    });
  }, []);

  return (
    <Stack>
      <Title>Moves</Title>
      {values.moves.map(({ type, level, name }, i) => (
        <Card
          withBorder
          shadow="sm"
          padding="lg"
          radius="md"
          sx={{ overflow: "visible" }}
        >
          <Stack spacing="xs">
            <Center>
              <Avatar src={moves.find((move) => move.value === name)?.image}>
                ?
              </Avatar>
            </Center>
            <Group gap="xs" grow>
              <Select
                data={moveLearnTypes}
                itemComponent={SelectItem}
                value={type}
                onChange={(val) => setFieldValue(`moves.${i}.type`, val)}
              />
              {type === "level" && (
                <NumberInput
                  value={level}
                  min={0}
                  max={100}
                  onChange={(val) => setFieldValue(`moves.${i}.level`, val)}
                />
              )}
            </Group>
            <Select
              data={moves}
              value={name}
              itemComponent={SelectItem}
              clearable
              searchable
              limit={20}
              onChange={(val) => setFieldValue(`moves.${i}.name`, val)}
            />
            <Button onClick={() => removeListItem("moves", i)}>
              <IconMinus />
            </Button>
          </Stack>
        </Card>
      ))}
      <Button onClick={handleAdd}>
        <IconPlus />
      </Button>
    </Stack>
  );
}
