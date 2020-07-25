package nl.bs.midilibrarian.port.adapters.rest;

import nl.bs.midilibrarian.domain.NetworkInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.net.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NetworkInfoResource {

    private static final Logger LOG = LoggerFactory.getLogger(NetworkInfoResource.class);

    @GetMapping(value = "/localIP")
    public NetworkInfo getLocalIP() {
        LOG.info("get local IP");
        String localIP = "";
        String ip = "";
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            while (interfaces.hasMoreElements()) {
                NetworkInterface iface = interfaces.nextElement();
                // filters out 127.0.0.1 and inactive interfaces
                if (iface.isLoopback() || !iface.isUp())
                    continue;

                Enumeration<InetAddress> addresses = iface.getInetAddresses();
                while(addresses.hasMoreElements()) {
                    InetAddress address = addresses.nextElement();
                    ip = address.getHostAddress();
                    if (ip.contains(".")) {
                        localIP = ip;
                    }
                }
            }
        } catch (SocketException e) {
            LOG.error("Erroro while getting local IP address {}", e.getMessage());
        }
        return new NetworkInfo(localIP);
    }



}
