import { Modal, View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

import {
  ActionProps,
  AlertProps,
  setAlertOpen,
  useAlertOpen,
  useAlertState,
} from "@/src/utils/alerts";

export function Alert() {
  const AlertProps: AlertProps = useAlertState();
  const open: boolean = useAlertOpen();

  const actions: Array<ActionProps> = AlertProps?.actions ?? [{ text: "OK" }];

  return (
    <Modal transparent animationType="fade" visible={open}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{AlertProps.title}</Text>
          <Text style={styles.description}>{AlertProps.description}</Text>

          <View style={styles.actions}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={[styles.btn, styles[action.style ?? "outline"]]}
                onPress={() => {
                  action?.onPress?.();
                  setAlertOpen(false);
                }}
              >
                <Text style={styles.text}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
