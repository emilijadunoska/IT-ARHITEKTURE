package ita.groupclassesservice.jms.consumer;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.jms.JMSConsumer;
import jakarta.jms.JMSContext;
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import jakarta.jms.*;


@ApplicationScoped
public class GroupClassLogConsumer {

    @Inject
    ConnectionFactory connectionFactory;

    @Resource(mappedName = "java:/jms/queue/GroupClassQueue")
    Queue logQueue;

    private final Logger logger = LoggerFactory.getLogger(GroupClassLogConsumer.class);

    @PostConstruct
    public void init() {
        JMSContext context = connectionFactory.createContext();
        JMSConsumer consumer = context.createConsumer(logQueue);
        consumer.setMessageListener(message -> {
            try {
                String logMessage = message.getBody(String.class);
                logger.info("Received log message: {}", logMessage);
            } catch (JMSException e) {
                logger.error("Failed to process log message", e);
            }
        });
    }
}
