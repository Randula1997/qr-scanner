import React from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/base";
import styles from "./styles";

const SummaryCard = ({data, totalPlanCarder}) => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Summary</Card.Title>
            <Card.Divider />
            <View>
              <View style={styles.textLine}>
                <Text style={styles.summaryText}>TOTAL CARDRE</Text>
                <Text style={styles.summaryText}>TOTAL W/IN</Text>
                <Text style={styles.summaryText}>TOTAL SAH</Text>
                <Text style={styles.summaryText}>EFFICIENCY</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.summaryNumbers}>{totalPlanCarder}</Text>
                <Text style={styles.summaryNumbers}>
                  {data.reduce((total: any, item: { totalOutput: any; }) => total + item.totalOutput, 0)}
                </Text>
                <Text style={styles.summaryNumbers}>
                  {data.reduce((total: any, item: { sah: any; }) => total + item.sah, 0).toFixed(2)}
                </Text>
                <Text style={styles.summaryNumbers}>
                  {(
                    (data.reduce((total: any, item: { sah: any; }) => total + item.sah, 0) /
                      (totalPlanCarder * 9.5)) *
                    100
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
        </Card>
    )
}

export default SummaryCard;